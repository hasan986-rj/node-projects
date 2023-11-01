#!/usr/bin/env node
import inquirer from "inquirer";

console.log("Welcome to number guessing game!");


for(let i=0; i<40; i++){
let math1=Math.round(Math.random()*10);
    let guess=await inquirer.prompt({
        name:'game',
        type:'number',
        message:'Please enter your guess/number'
    });
    if(guess.game<math1){
        console.log(`Your number has not matched. computer no. is ${math1} `);
        
    } else if(guess.game>math1){
        console.log(`Your number has not matched. computer no. is ${math1}`);
        
    } else if (guess.game===math1){
        console.log(`Your number has matched. computer number is ${math1}`);
        
    };

    let ask=await inquirer.prompt({
        name:"offer",
        type:"list",
        choices:['y','n'],
        message:'if you want to try again press "y" and if you donot want to continue press"n" .'
    });
    if(ask.offer==='y'){
        continue
    } else {console.log("Thankyou for playing the game.");
    } break;
};
