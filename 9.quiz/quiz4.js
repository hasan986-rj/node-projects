import inquirer from 'inquirer';
;
let quizQuestions = [
    {
        question: 'What is the capital of France?',
        choices: ['A. Paris', 'B. London', 'C. Berlin', 'D. Madrid'],
        correctAnswer: 'A. Paris'
    },
    {
        question: 'Which planet is known as the Red Planet?',
        choices: ['A. Venus', 'B. Earth', 'C. Mars', 'D. Jupiter'],
        correctAnswer: 'C. Mars'
    },
    {
        question: 'What is the largest mammal on Earth?',
        choices: ['A. Elephant', 'B. Giraffe', 'C. Blue Whale', 'D. Dolphin'],
        correctAnswer: 'C. Blue Whale'
    }
];
let userAnswers = {};
async function runQuiz() {
    for (let question of quizQuestions) {
        let answer = await inquirer.prompt({
            type: 'list',
            name: 'response',
            message: question.question,
            choices: question.choices,
        });
        userAnswers[question.question] = answer.response;
    }
    let score = 0;
    for (let question of quizQuestions) {
        if (userAnswers[question.question] === question.correctAnswer) {
            score++;
        }
    }
    console.log('Quiz complete! Your score: ' + score + '/' + quizQuestions.length);
    // Show correct answers
    for (let question of quizQuestions) {
        console.log(`Question: ${question.question}`);
        console.log(`Correct Answer: ${question.correctAnswer}\n`);
    }
    let playAgain = await inquirer.prompt({
        type: 'confirm',
        name: 'playAgain',
        message: 'Do you want to play again?',
        default: false,
    });
    if (playAgain.playAgain) {
        userAnswers = {};
        runQuiz();
    }
    else {
        console.log('Thank you for playing!');
    }
}
runQuiz();
