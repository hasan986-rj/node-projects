import inquirer from "inquirer";
import { start } from "repl";

let curriencies:{[key:string]:number}={
    USD:100,
    JPN:200,
    POUND:300,
    EURO:400,
    PKR:500,
};
// fun to convert currency
function currenceyconverter(amount:number,from:string, to:string){
    from=from.toUpperCase();
    to=to.toUpperCase();
    if (curriencies[from] && curriencies[to]){
        return (amount/curriencies[from])*curriencies[to];
    };
    return undefined;
};

//function for available curriencies display
function savedCurriencies(){
    console.log('\n Available Curriencies:');
    console.log(curriencies);
    console.log(Object.keys(curriencies).join('\n'));
};

async function startConverter(){
    savedCurriencies()

    await inquirer.prompt([
        {
            name:'amount',
            type:'number',
            message:'Enter the amount to be converted'
        },
        {
            name:'from',
            type:'input',
            message:'enter the currency to be converted'
        },
        {
            name:'to',
            type:'input',
            message:'Enter the target currency'
        },
    ]).then((answers)=>{
        let amount=answers.amount;
        let from=answers.from.toUpperCase();
        let to=answers.to.toUpperCase();

        let convertedAmount=currenceyconverter(amount,from,to);
        if(convertedAmount!==undefined){
            console.log(`Converted Amount: ${amount} ${from}=${convertedAmount} ${to} `);
        } else console.log('Invalid currency codes. Please enter valid currency codes.');
        
    });



    inquirer.prompt({
        type:'confirm',
        name:'continue',
        message:'Do you want to continue',
    }).then((answers1)=>{
        if(answers1.continue){
            startConverter()
        } else console.log('Thankyou for using currency converter. Good bye.');
        
    });

};

console.log('Welcome to Currency Converter!');
startConverter()
