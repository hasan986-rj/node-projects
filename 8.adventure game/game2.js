import inquirer from "inquirer";
class Scanner {
}
class Main {
    async main() {
        // System objects
        let scanner = new Scanner();
        // Game variables
        let enemies = ["Skeleton", "Zombies", "Warrior", "Assassin"];
        let maxEnemyHealth = 75;
        let enemyAttackDamage = 25;
        // Player variables
        let health = 100;
        let attackDamage = 50;
        let numHealthPotions = 3;
        let healthPotionHealAmount = 30;
        let healthPotionDropChance = 50; // percentage
        let running = true;
        console.log("Welcome to the Dungeon!");
        GAME: while (running) {
            console.log("-----------------------------------------------------------");
            let enemyHealth = maxEnemyHealth;
            let enemyIndex = Math.floor(Math.random() * enemies.length);
            let enemy = enemies[enemyIndex]; // Get the enemy name
            console.log(`\t# ${enemy} appeared! #\n`);
            while (enemyHealth > 0) {
                console.log("\t Your HP: " + health);
                console.log(`\t ${enemy}'s HP: ${enemyHealth}`);
                console.log("\n \t What would you like to do? ");
                console.log("\t1. Attack");
                console.log("\t2. Drink health potion");
                console.log("\t3. Run");
                let ask = await inquirer.prompt([
                    {
                        name: "input",
                        type: "input",
                        message: "Please select an option: ",
                    },
                ]);
                if (ask.input === "1") {
                    let damageDealt = attackDamage;
                    let damageTaken = enemyAttackDamage;
                    enemyHealth -= damageDealt;
                    health -= damageTaken;
                    console.log(`\tYou strike the ${enemy} for ${damageDealt} damage.`);
                    console.log(`\tYou receive ${damageTaken} in retaliation.`);
                    if (health < 1) {
                        console.log("You have taken too much damage, you are too weak to go on.");
                        break;
                    }
                }
                else if (ask.input === "2") {
                    if (numHealthPotions > 0) {
                        health += healthPotionHealAmount;
                        numHealthPotions--;
                        console.log(`\tYou drink a health potion, healing yourself for ${healthPotionHealAmount}.`);
                        console.log(`\tYou now have ${health} HP.`);
                        console.log(`\tYou have ${numHealthPotions} health potions left.`);
                    }
                    else {
                        console.log("\tYou have no health potions left! Defeat enemies for a chance to get one!");
                    }
                }
                else if (ask.input === "3") {
                    console.log(`\tYou run away from the ${enemy}!`);
                    continue GAME;
                }
                else {
                    console.log("\tInvalid Command!");
                }
            }
            if (health < 1) {
                console.log("Your limp out of the dungeon, weak from battle.");
                break;
            }
            console.log("---------------------------------------------------------------------------");
            console.log(` # ${enemy} was defeated! #`);
            console.log(`# You have ${health} HP left.#`);
            if (Math.random() * 100 < healthPotionDropChance) {
                numHealthPotions++;
                console.log(`# The ${enemy} dropped a health potion! #`);
                console.log(` # You now have ${numHealthPotions} health potion(s). #`);
            }
            console.log(`---------------------------------------------`);
            console.log("What would you like to do now?");
            console.log("1. Continue fighting");
            console.log('2. Exit');
            let ask2 = await inquirer.prompt([
                {
                    name: "input2",
                    type: "string",
                    message: "Please select one option!",
                },
            ]);
            while (ask2.input2 !== "1" && ask2.input2 !== "2") {
                console.log("Invalid Command!");
                ask2 = await inquirer.prompt([
                    {
                        name: "input2",
                        type: "string",
                        message: "Please select one option!",
                    },
                ]);
            }
            if (ask2.input2 === "1") {
                console.log("You continue on your adventure!");
            }
            else if (ask2.input2 === "2") {
                console.log("You exit the dungeon, successful from your adventures!");
                break;
            }
        }
        console.log("########################");
        console.log(" # THANKS FOR PLAYING! #");
        console.log("########################");
    }
}
let mainOpt = new Main();
mainOpt.main();
