// ------------------------------------------------------------
// Quarks Casino: Quantum Dice
// Kevin Goates, January 26, 2026
// This file contains all JavaScript logic for the game page.
// ------------------------------------------------------------


// these variables track the player's results while the page stays open
let wins = 0;     // number of wins
let losses = 0;   // number of losses
let pushes = 0;   // number of pushes


// window.onload runs after the page finishes loading
// we use it so we can safely access HTML elements like the form
window.onload = function () {

    // get the form from the HTML using the id
    const form = document.getElementById("casinoForm");

    // if this page does not have the form, do nothing
    // this prevents errors if code.js is ever linked to other pages
    if (!form) {
        return;
    }

    // when the user submits the form, run our game function
    // this is NOT addEventListener
    form.onsubmit = function (event) {

        // stop the form from reloading the page
        event.preventDefault();

        // call the main game function
        playQuantumDice();
    };
};


// ------------------------------------------------------------
// FUNCTION #1: playQuantumDice()
// this runs the casino dice game when the form is submitted
// it uses random numbers, math, conditionals, and innerHTML output
// ------------------------------------------------------------
function playQuantumDice() {

    // get the player's name from the input box
    const playerName = document.getElementById("playerName").value;

    // get the secret code from the input box
    const secretCode = document.getElementById("secretCode").value;

    // get the output area where results will be printed
    const output = document.getElementById("outputArea");


    // ----------------------------
    // validation
    // ----------------------------

    // if the name is blank or only spaces, show a validation message
    if (playerName.trim() === "") {
        output.innerHTML =
            "<h2>Validation Error</h2>" +
            "<p>Please enter your <strong>Player Name</strong> before rolling.</p>";
        return; // stop the function so the game does not run
    }

    // if the secret code is blank or only spaces, show a validation message
    if (secretCode.trim() === "") {
        output.innerHTML =
            "<h2>Validation Error</h2>" +
            "<p>Please enter your <strong>Secret Casino Code</strong> before rolling.</p>";
        return; // stop the function so the game does not run
    }


    // ------------------------------------------------------------
    // FUNCTION #2: isPalindrome(text)
    // this takes a parameter and returns true or false
    // ------------------------------------------------------------
    const palindromeResult = isPalindrome(secretCode);


    // generate two random dice values from 1 to 6
    const die1 = rollDie(); // first die roll
    const die2 = rollDie(); // second die roll

    // add them together using math
    const sum = die1 + die2;


    // store the game result message here
    let gameMessage = "";

    // craps rule: sum of 7 or 11 is a loss
    if (sum === 7 || sum === 11) {
        gameMessage = "CRAPS — You lose!";
        losses++; // add 1 to losses

    // craps rule: even doubles (2,4,6) is a win
    } else if (die1 === die2 && die1 % 2 === 0) {
        gameMessage = "You won with even doubles!";
        wins++; // add 1 to wins

    // otherwise the result is a push
    } else {
        gameMessage = "You pushed! Nobody wins.";
        pushes++; // add 1 to pushes
    }


    // build the palindrome message based on true/false result
    let palindromeMessage = "";
    if (palindromeResult === true) {
        palindromeMessage =
            "Your secret code <strong>\"" + secretCode + "\"</strong> is a palindrome!";
    } else {
        palindromeMessage =
            "Your secret code <strong>\"" + secretCode + "\"</strong> is NOT a palindrome.";
    }


    // build a dice emoji display for better user experience
    const diceDisplay =
        "<p style='font-size: 32px;'>" +
        diceEmoji(die1) + " " + diceEmoji(die2) +
        "</p>";


    // output everything using innerHTML
    output.innerHTML =
        "<h2>Welcome, " + playerName + "!</h2>" +
        "<p>" + palindromeMessage + "</p>" +
        "<h3>Quantum Dice Roll</h3>" +
        diceDisplay +
        "<p><strong>Die 1:</strong> " + die1 + "</p>" +
        "<p><strong>Die 2:</strong> " + die2 + "</p>" +
        "<p><strong>Sum:</strong> " + sum + "</p>" +
        "<h3>" + gameMessage + "</h3>" +
        "<hr>" +
        "<h3>Scoreboard</h3>" +
        "<p><strong>Wins:</strong> " + wins + "</p>" +
        "<p><strong>Losses:</strong> " + losses + "</p>" +
        "<p><strong>Pushes:</strong> " + pushes + "</p>";
}


// ------------------------------------------------------------
// helper function: rollDie()
// this returns a random whole number from 1 to 6
// it uses Math.random() and Math.floor() (math functions)
// ------------------------------------------------------------
function rollDie() {

    // Math.random() gives 0 to 0.999...
    // multiply by 6 gives 0 to 5.999...
    // Math.floor makes it 0 to 5
    // add 1 makes it 1 to 6
    return Math.floor(Math.random() * 6) + 1;
}


// ------------------------------------------------------------
// helper function: diceEmoji(value)
// this takes a parameter and returns a matching dice emoji
// ------------------------------------------------------------
function diceEmoji(value) {

    // return the correct emoji for the dice number
    if (value === 1) { return "⚀"; }
    if (value === 2) { return "⚁"; }
    if (value === 3) { return "⚂"; }
    if (value === 4) { return "⚃"; }
    if (value === 5) { return "⚄"; }
    return "⚅"; // if it is not 1-5, it must be 6
}


// ------------------------------------------------------------
// FUNCTION #2: isPalindrome(text)
// this takes a parameter (text) and returns true if it is a palindrome
// it does not use alerts; it returns a boolean value
// ------------------------------------------------------------
function isPalindrome(text) {

    // convert to lowercase so capitals do not matter
    let cleaned = text.toLowerCase();

    // remove spaces so phrases like "taco cat" work
    cleaned = cleaned.replaceAll(" ", "");

    // reverse the string by turning it into an array, reversing, and joining
    const reversed = cleaned.split("").reverse().join("");

    // return true if they match, otherwise return false
    return cleaned === reversed;
}
