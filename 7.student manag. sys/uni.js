import { log } from "console";
import inquirer from "inquirer";
log("WELCOME.");
await inquirer.prompt([{
        name: 'name',
        type: 'string',
        message: 'Enter your name'
    },
    {
        name: 'age',
        type: 'number',
        message: 'Enter your age'
    },
    {
        name: 'COURSES',
        type: 'confirm',
        type1: 'confirm',
        messgae: 'Select one of the following',
        choices: ['',]
    }
]);
log("hello");
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    ;
}
;
class Student extends Person {
    constructor(name, age, rollNumber) {
        super(name, age);
        this.courses = [];
        this.rollNumber = rollNumber;
    }
    ;
    registerForCourses(course) {
        this.courses.push(course);
    }
    ;
}
;
class Instructor extends Person {
    constructor(name, age, salary) {
        super(name, age);
        this.courses = [];
        this.salary = salary;
    }
    ;
    assignCourse(course) {
        this.courses.push(course);
    }
    ;
}
;
//new students object using class
let std1 = new Student("Ahmed", 45, 123);
let std2 = new Student("Ali", 34, 2345);
//new instructors object using class
let inst1 = new Instructor("Imran", 34, 80000);
let inst2 = new Instructor("Huzaifa", 26, 75000);
class Course {
    constructor(name, id) {
        this.students = [];
        this.instructor = [];
        this.id = id;
        this.name = name;
    }
    addStudent(std) {
        this.students.push(std);
    }
    ;
    setInstructor(inst) {
        this.instructor.push(inst);
    }
    ;
}
;
let course1 = new Course("Artificial Intelligence", 1);
let course2 = new Course("Web3.0", 2);
//assigning students in courses
course1.addStudent(std1);
course2.addStudent(std2);
// assigning Instructors in courses
course1.setInstructor(inst1);
course2.setInstructor(inst2);
class Department {
    constructor(name) {
        this.courses = [];
        this.name = name;
    }
    ;
    addCourse(course) {
        this.courses.push(course);
    }
    ;
}
;
let d1 = new Department("Computer Science");
d1.addCourse(course1);
d1.addCourse(course2);
console.log(d1);
