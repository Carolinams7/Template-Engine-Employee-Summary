const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
​
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");
​
const render = require("./lib/htmlRenderer");
​
// empty array of team members
const teamArray = [];

// prompt user for information
function startPrompt() {
  inquirer.prompt(
    {
      type: "list",
      message: "Would you like to create a team?",
      choices: ['Yes', 'No'],
      name: "start"
    }
  )
    .then(function (res) {
      if (res.start === 'Yes') {
        console.log("build team");
        findRole();
      } else {
        console.log("Goodbye");
      }
    })
}

function findRole() {
  inquirer.prompt(
    {
      type: "list",
      message: "To add a new team member, please select one of the following:",
      choices: ['School', 'Github Username', 'Office Number'],
      name: "role"
    }
    // this was done with the intent of not asking their direct role, but assigning their class based on their input
  )
    .then(function (res) {
      switch (res.role) {
        case 'School':
          buildIntern(res);
          break;
        case 'Github Username':
          buildEngineer(res);
          break;
        case 'Office Number':
          buildManager(res);
          break;

      }
    })

  function buildIntern(res) {
    let intern = new Intern(res.school, res.name, res.id, res.email);
    inquirer.prompt([
      {
        type: "input",
        message: "Enter Intern School:",
        name: "school"
      },
      {
        type: "input",
        message: "Enter Intern Name:",
        name: "name"
      },
      {
        type: "input",
        message: "Enter ID:",
        name: "id"
      },
      {
        type: "input",
        message: "Enter email addres:",
        name: "email"
      }
    ])
      .then(function (res) {
        intern.school = res.school;
        intern.name = res.name;
        intern.id = res.id;
        intern.email = res.email;
        teamArray.push(intern);
        handleSize();

      })
  }
  function buildEngineer(res) {
    let engineer = new Engineer(res.github, res.name, res.id, res.email);
    inquirer.prompt([
      {
        type: "input",
        message: "Enter Engineer Github username:",
        name: "github"
      },
      {
        type: "input",
        message: "Enter Engineer Name:",
        name: "name"
      },
      {
        type: "input",
        message: "Enter ID:",
        name: "id"
      },
      {
        type: "input",
        message: "Enter email addres:",
        name: "email"
      }
    ])
      .then(function (res) {
        engineer.github = res.github;
        engineer.name = res.name;
        engineer.id = res.id;
        engineer.email = res.email;
        teamArray.push(engineer);
        console.log(teamArray);
        handleSize();
      })
  }
  function buildManager(res) {
    let manager = new Manager(res.officenumber, res.name, res.id, res.email);
    inquirer.prompt([
      {
        type: "input",
        message: "Enter Manager office number:",
        name: "officenumber"
      },
      {
        type: "input",
        message: "Enter Manager Name:",
        name: "name"
      },
      {
        type: "input",
        message: "Enter ID:",
        name: "id"
      },
      {
        type: "input",
        message: "Enter email addres:",
        name: "email"
      }
    ])
      .then(function (res) {
        manager.officenumber = res.officenumber;
        manager.name = res.name;
        manager.id = res.id;
        manager.email = res.email;
        teamArray.push(manager);
        console.log(teamArray);
        handleSize();
      })
  }
}

function handleSize(){
  inquirer.prompt(
    {
      type: "list",
      message: "Add another member?",
      choices: ['Yes', 'No'],
      name: "add"
    }
  ).then(function (res) {
    if (res.add === 'Yes') {
      console.log("build team");
      findRole();
    } else {
      writeToHTML();
    }
  })
}

// build roles
function writeToHTML() {
  console.log("write to hmtl");
  // fs.writeFile("./output/team.html", buildHTML())
}
startPrompt();
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
​
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
​
// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.
​
// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.
​
// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```
