import inquirer from 'inquirer';
let startTime = null;
let timerInterval = null;
function formatTime(seconds, milliseconds) {
    return `${seconds} seconds ${milliseconds} milliseconds`;
}
function getCurrentDateTime() {
    const date_ob = new Date();
    const date = ("0" + date_ob.getDate()).slice(-2);
    const month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    const year = date_ob.getFullYear();
    const hours = date_ob.getHours();
    const minutes = date_ob.getMinutes();
    const seconds = date_ob.getSeconds();
    const milliseconds = date_ob.getMilliseconds();
    return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}.${milliseconds}`;
}
function startTimer() {
    if (startTime) {
        console.log('Timer is already running. Use "Stop Timer" to stop it.');
        return;
    }
    startTime = process.hrtime();
    const currentDateTime = getCurrentDateTime();
    console.log(`Timer started at ${currentDateTime}. Elapsed time:`);
    // Update and display the elapsed time every 100 milliseconds
    timerInterval = setInterval(() => {
        if (startTime) {
            const [elapsedSeconds, elapsedNanoseconds] = process.hrtime(startTime);
            const elapsedMilliseconds = Math.floor(elapsedNanoseconds / 1000000); // Convert nanoseconds to milliseconds
            const formattedTime = formatTime(elapsedSeconds, elapsedMilliseconds);
            process.stdout.write(`\rElapsed Time: ${formattedTime}`);
        }
    }, 100);
}
function stopTimer() {
    if (!startTime) {
        console.log('No timer is running. Use "Start Timer" to start it.');
        return;
    }
    clearInterval(timerInterval);
    const [elapsedSeconds, elapsedNanoseconds] = process.hrtime(startTime);
    const elapsedMilliseconds = Math.floor(elapsedNanoseconds / 1000000); // Convert nanoseconds to milliseconds
    startTime = null;
    const currentDateTime = getCurrentDateTime();
    console.log('\nTimer stopped at ' + currentDateTime);
    console.log(`Elapsed time: ${formatTime(elapsedSeconds, elapsedMilliseconds)}`);
}
async function main() {
    while (true) {
        const choice = await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'Choose an action:',
                choices: ['Start Timer', 'Stop Timer', 'Exit'],
            },
        ]);
        switch (choice.action) {
            case 'Start Timer':
                startTimer();
                break;
            case 'Stop Timer':
                stopTimer();
                break;
            case 'Exit':
                process.exit();
        }
    }
}
main();
