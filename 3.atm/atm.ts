import inquirer from 'inquirer';


interface UserAccount {
  id: string;
  password: string;
  balance: number;
}

// Sample user accounts
const users: {[id:string]:UserAccount} = {
  user1:{ id: 'user1', password: 'pass1', balance: 1000 },
  user2:{ id: 'user2', password: 'pass2', balance: 1500 },
  user3:{ id: 'user3', password: 'pass3', balance: 3000 },
};

function authenticateUser(id:string,password:string):UserAccount|null{
    var user=users[id];
    if(user && user.password===password){
    return user};
    return null;
};

// Function to display the ATM menu
function displayMenu(user: UserAccount) {
  console.log(`\nWelcome, ${user.id}!`);
  console.log('ATM Menu:');
  console.log('1. Check Balance');
  console.log('2. Deposit');
  console.log('3. Withdraw');
  console.log('4. Exit');
}

// Function to start the ATM
function startATM() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'userId',
        message: 'Enter your user ID:',
      },
      {
        type: 'password',
        name: 'password',
        message: 'Enter your password:',
      },
    ])
    .then((answers) => {
      const user = authenticateUser(answers.userId, answers.password);

      if (!user) {
        console.log('Authentication failed. Please try again.');
        startATM();
      } else {
        mainMenu(user);
      }
    });
}

// Function to display the main ATM menu
function mainMenu(user: UserAccount) {
  displayMenu(user);

  inquirer
    .prompt({
      type: 'input',
      name: 'option',
      message: 'Select an option (1-4):',
    })
    .then((answer) => {
      const option = answer.option;

      switch (option) {
        case '1':
          console.log(`Your balance: $${user.balance}`);
          mainMenu(user);
          break;
        case '2':
          inquirer
            .prompt({
              type: 'input',
              name: 'amount',
              message: 'Enter the deposit amount:',
            })
            .then((answer) => {
              const depositAmount = parseFloat(answer.amount);
              if (!isNaN(depositAmount) && depositAmount > 0) {
                user.balance += depositAmount;
                console.log(`Deposited $${depositAmount} successfully.`);
              } else {
                console.log('Invalid amount. Please try again.');
              }
              mainMenu(user);
            });
          break;
        case '3':
          inquirer
            .prompt({
              type: 'input',
              name: 'amount',
              message: 'Enter the withdrawal amount:',
            })
            .then((answer) => {
              const withdrawalAmount = parseFloat(answer.amount);
              if (!isNaN(withdrawalAmount) && withdrawalAmount > 0 && withdrawalAmount <= user.balance) {
                user.balance -= withdrawalAmount;
                console.log(`Withdrawn $${withdrawalAmount} successfully.`);
              } else {
                console.log('Invalid amount or insufficient balance. Please try again.');
              }
              mainMenu(user);
            });
          break;
        case '4':
          console.log('Thank you for using the ATM. Goodbye!');
          break;
        default:
          console.log('Invalid option. Please try again.');
          mainMenu(user);
          break;
      }
    });
}

// Start the ATM
startATM();
