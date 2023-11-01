
import inquirer from "inquirer";

interface answer{
    page:string
}
    console.log('Welcome to Word Counter Game!\n\t');
async function start(){
    const answer:answer=await inquirer.prompt([{
    name:'page',
    type:'input',
    message:'Write your paragraph/sentence here.'
    }]);
    
    let [charCount, wordCount] = CharAndWords(answer.page);

    console.log(`Character count: ${charCount}`);
    console.log(`Word count: ${wordCount}`);
        inquirer.prompt([{
            name:'ask',
            type:'confirm',
            message:'Do you want to continue?',
        }]).then((answers)=>{
                if(answers.ask){
                    console.log(start());
                }else {console.log('Thankyou for using word counter.');
                };
        });}
// function for counting words and characters 
function CharAndWords(inputPara:string):[number,number]{
    let charCount=0;
    let wordCount=0;

    for(let character of inputPara){
        if(character.trim() !=="")
        charCount++;
    };
        let words=inputPara.split(/\s+/);
    for (let word of words){
        if(word !==""){
            wordCount++;
        };
    };
    return[charCount,wordCount];
};

start();