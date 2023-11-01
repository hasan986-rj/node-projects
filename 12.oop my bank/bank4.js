import inquirer from 'inquirer';
class Customer {
    constructor() {
        this.firstName = '';
        this.lastName = '';
        this.gender = '';
        this.age = 0;
        this.mobileNumber = '';
        this.bankAccount = new BankAccount();
    }
    async register() {
        console.log('Please register your account!');
        let userDetails = await inquirer.prompt([
            {
                type: 'input',
                name: 'firstName',
                message: 'Enter your first name:',
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'Enter your last name:',
            },
            {
                type: 'list',
                name: 'gender',
                message: 'Enter your gender:',
                choices: ['Male', 'Female', 'Other'],
            },
            {
                type: 'input',
                name: 'age',
                message: 'Enter your age:',
                validate: (input) => {
                    let age = parseInt(input);
                    if (isNaN(age) || age <= 0) {
                        return 'Please enter a valid positive age.';
                    }
                    return true;
                },
            },
            {
                type: 'input',
                name: 'mobileNumber',
                message: 'Enter your mobile number:',
            },
        ]);
        this.firstName = userDetails.firstName;
        this.lastName = userDetails.lastName;
        this.gender = userDetails.gender;
        this.age = parseInt(userDetails.age);
        this.mobileNumber = userDetails.mobileNumber;
    }
    customerInfo() {
        return (`Name: ${this.firstName} ${this.lastName} \nAge: ${this.age}\nGender: ${this.gender} \nMobile: ${this.mobileNumber}\nAccount Balance: ${this.bankAccount.accountBalance}`);
    }
    async performActions() {
        while (true) {
            let action = await inquirer.prompt({
                type: 'list',
                name: 'action',
                message: 'Choose an action:',
                choices: ['View Customer Info', 'View Balance', 'Debit', 'Credit', 'Exit'],
            });
            if (action.action === 'View Customer Info') {
                console.log(this.customerInfo());
            }
            else if (action.action === 'Debit') {
                let debitAmount = await inquirer.prompt({
                    type: 'input',
                    name: 'debitAmount',
                    message: 'Enter the debit amount:',
                    validate: (input) => {
                        let amount = parseFloat(input);
                        if (isNaN(amount) || amount <= 0) {
                            return 'Please enter a valid positive number.';
                        }
                        return true;
                    },
                });
                let debitAmount1 = parseFloat(debitAmount.debitAmount);
                let debitResult = this.bankAccount.debit(debitAmount.debitAmount);
                console.log(debitResult);
            }
            else if (action.action === 'Credit') {
                let creditAmount = await inquirer.prompt({
                    type: 'input',
                    name: 'creditAmount',
                    message: 'Enter the credit amount:',
                    validate: (input) => {
                        let amount = parseFloat(input);
                        if (isNaN(amount) || amount <= 0) {
                            return 'Please enter a valid positive number.';
                        }
                        return true;
                    },
                });
                let creditAmount1 = parseFloat(creditAmount.creditAmount);
                let creditResult = this.bankAccount.credit(creditAmount1);
                console.log(creditResult);
            }
            else if (action.action === 'View Balance') {
                console.log(`Your Balance is: ${this.bankAccount.accountBalance}`);
            }
            else if (action.action === 'Exit') {
                break;
            }
        }
    }
}
class BankAccount {
    constructor() {
        this.accountBalance = 100;
    }
    debit(amount) {
        if (amount > this.accountBalance) {
            return 'Sorry, you have insufficient balance.';
        }
        else {
            this.accountBalance -= amount;
            return `Transaction Successful! New account balance is ${this.accountBalance}`;
        }
    }
    credit(amount) {
        if (amount > 0) {
            this.accountBalance = this.accountBalance + amount;
            return `Your account has been credited successfully!
             your new Balance is: ${this.accountBalance} `;
        }
        else {
            return 'Transaction failed!';
        }
    }
}
async function main() {
    let customer = new Customer();
    await customer.register();
    customer.performActions();
}
main();
