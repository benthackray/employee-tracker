const mysql = require('mysql');
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: 'localhost',
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: 'root',
  
    // Be sure to update with your own MySQL password!
    password: 'Jenga625',
    database: 'employeeDB',
});

const openPrompt = () => {
    inquirer.prompt([{
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'Add a department, employee, or role',
            'View departments, employees and roles',
            'Update an employee role',
            'Exit'
        ],
        name: 'firstChoice'
    }])
    .then( (answer) => {
        console.log(answer);
        connection.end();
    }
    )
}







connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    // connection.end();
    openPrompt();
  });