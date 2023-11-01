#!/usr/bin/env node
import inquirer from "inquirer";
import Choices from "inquirer/lib/objects/choices.js";


let calculation=40;
for(let i=0; i<calculation; i++){
    let calc2= await inquirer.prompt([
    {
        type:"number",
        name:"num1",
        message:"Enter your 1st number"},
    {
        type:"number",
        name:"num2",
        message:"Enter your 2nd number"
    },
    {
        type:"list",
        name:"operator",
        message:"Please select an operator",
        choices:['+', '-', '*', '/','%']
    },
]);

if(calc2.operator=== '+'){
    console.log(calc2.num1+calc2.num2);

} else if (calc2.operator==='-'){
    console.log(calc2.num1-calc2.num2);

} else if (calc2.operator==='*'){
    console.log(calc2.num1*calc2.num2);

} else if (calc2.operator==='/'){
    console.log(calc2.num1/calc2.num2);

} else if (calc2.operator=== '%'){
  console.log(calc2.num1%calc2.num2);
} else {
    console.log("Invalid operation");
    };

let opt=await inquirer.prompt({
        type:"list",
        name:"select",
        message:"If you want to continue the operation press 'y' or press 'n'.",
        choices:["y","n"],

})
if(opt.select==="y"){
    continue
} else {console.log("Thankyou for using this Calculator.")};
break
};