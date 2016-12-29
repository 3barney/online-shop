import colors from "colors";

/* eslint-disable no-console */

console.log("Welcome to the universe ...".bold.underline);
console.log("Evaluating thrusters and Firing engines ...".red);
console.log("Wait for the green lights.".yellow);

setTimeout(function() {
  console.log("Starting app in dev mode...".green);
  console.log("Good to go");
}, 1000);
