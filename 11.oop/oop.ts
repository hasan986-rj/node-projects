
import inquirer from 'inquirer'

//Person class
class Person{
    private personality:string;

    public constructor(){
        this.personality='Mystery';
    };

    public askQuestion(answer:number):void{
        answer===1? this.personality='Extravert': answer===2 ? this.personality='Introvert' 
        :this.personality='still a Mystery.';

    };

    public getPersonality():string{
        return this.personality
    };


};

//program class
class Program{
    static async main(args:string[]):Promise<void>{
    try{
        let input= await inquirer.prompt({
                type:'input',
                name:'msg',
                message:'Type 1 if you like to talk to others and type 2 if you rather keep to yourself.',
        });
        
    let myPerson = new Person();
    myPerson.askQuestion(Number(input.msg));
    
    console.log(`you are ${myPerson.getPersonality()} .`);

    let name= await inquirer.prompt([{
        type:'string',
        name:'name1',
        message:'What is your name?'
    }]);
        let myStudent= new Student(name.name1);
        myStudent.Name=name;
        console.log(`Your name is ${myStudent.Name} And your personality type is ${myStudent.getPersonality()}`)
     } catch(error){   
       
            console.log('Please enter a number Value');
        }; 
    }
};

Program.main([]);

//student class
class Student extends Person{
    private name:string;

    constructor(name:string){
       super()
        this.name=name;

    };
    // public Name:string;
    get Name(){
        return this.name
    };
    set Name(name:string){
        this.name
    };
};