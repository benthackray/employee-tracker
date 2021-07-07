const mysql = require('mysql');
const inquirer = require("inquirer");
const cTable = require('console.table');
require('dotenv').config();

const connection = mysql.createConnection({
    host: 'localhost',
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: 'root',
  
    // Be sure to update with your own MySQL password!
    password: process.env.DB_PASS,
    database: 'employeeDB',
});

const openPrompt = () => {
    inquirer.prompt([{
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'Add a department',
            'Add an employee',
            'Add a role',
            'View all employees',
            'View all employees by department',
            'View all employees by role',
            'Update an employee role',
            'Exit'
        ],
        name: 'firstChoice'
    }])
    .then( (answer) => {
        if (answer.firstChoice === 'Add a department'){
            addDept();
        }else if (answer.firstChoice === 'Add an employee') {
            addEmployee();
        }else if (answer.firstChoice === 'Add a role') {
            addRole();
        }else if (answer.firstChoice === 'View all employees'){
            connection.query('SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT (m.first_name, " ", m.last_name) AS Manager FROM employee AS e INNER JOIN role AS r ON e.role_id=r.id INNER JOIN department AS d ON r.department_id=d.id LEFT JOIN employee m ON e.manager_id=m.id', 
            (err, results) => {
                if (err) throw err;
                console.table(results);
                openPrompt();
            })
        }else if (answer.firstChoice === 'View all employees by department'){
            connection.query('SELECT d.id AS department_id, d.name AS department, e.id AS employee_id, e.first_name, e.last_name, r.title, r.salary, CONCAT (m.first_name, " ", m.last_name) AS Manager FROM employee AS e INNER JOIN role AS r ON e.role_id=r.id INNER JOIN department AS d ON r.department_id=d.id LEFT JOIN employee m ON e.manager_id=m.id ORDER BY d.id', 
            (err, results) => {
                if (err) throw err;
                console.table(results);
                openPrompt();
            })
        }else if (answer.firstChoice === 'View all employees by role'){
            connection.query('SELECT r.id AS role_id, r.title, e.id AS employee_id, e.first_name, e.last_name, d.name AS department, r.salary, CONCAT (m.first_name, " ", m.last_name) AS Manager FROM employee AS e INNER JOIN role AS r ON e.role_id=r.id INNER JOIN department AS d ON r.department_id=d.id LEFT JOIN employee m ON e.manager_id=m.id ORDER BY r.id', 
            (err, results) => {
                if (err) throw err;
                console.table(results);
                openPrompt();
            })
        }else if (answer.firstChoice === 'Update an employee role') {
            updateRole();
        }else if (answer.firstChoice === 'Exit'){
            console.log('Thank you for using this Employee Tracker!');
            connection.end();
        }
    }
    )
}

// Add a department
const addDept = () => [
    inquirer.prompt([{
        name: 'dept',
        type: 'input',
        message: 'What would you like to call the new department?'
    }])
    .then((answer) =>
        connection.query(
            'INSERT INTO department SET ?',
            {name: answer.dept}, 
            (err) => {
                if (err) throw err;
                console.log('Your new department was added');
                openPrompt();
            }
        )
    )
]

// Add an employee
const addEmployee = () => [
    inquirer.prompt([{
        name: 'firstName',
        type: 'input',
        message: "What is the Employee's first name?"
    },
    {
        name: 'lastName',
        type: 'input',
        message: "What is the Employee's last name?"
    },
    {
        name: 'role',
        type: 'input',
        message: "What is the ID for this employee's role?"
    },
    {
        name: 'manager',
        type: 'input',
        message: "What is the ID for this employee's manager?"
    }])
    .then((answer) =>
        connection.query(
            'INSERT INTO employee SET ?',
            {
                first_name: answer.firstName,
                last_name: answer.lastName,
                role_id: answer.role,
                manager_id: answer.manager
            }, 
            (err) => {
                if (err) throw err;
                console.log('Your new employee was added');
                openPrompt();
            }
        )
    )
]

// Add a role
const addRole = () => [
    inquirer.prompt([{
        name: 'title',
        type: 'input',
        message: "What is the title of this role?"
    },
    {
        name: 'salary',
        type: 'input',
        message: "What is the salary of this role?"
    },
    {
        name: 'dept',
        type: 'input',
        message: "What department is this role associated with?"
    }])
    .then((answer) =>
        connection.query(
            'INSERT INTO role SET ?',
            {
                title: answer.title,
                salary: answer.salary,
                department_id: answer.dept
            }, 
            (err) => {
                if (err) throw err;
                console.log('Your new role was added');
                openPrompt();
            }
        )
    )
]


// Update employee role (I had my tutor help with this logic)
const updateRole = () => {

    let employeeInfo;
    let roleInfo;
    connection.query('SELECT id, first_name, last_name FROM employee',
        (err, results) => {
           employeeInfo = results;
           const names = employeeInfo.map(x => `${x.id} ${x.first_name} ${x.last_name}`);

           inquirer.prompt([{
            name: 'name',
            type: 'list',
            choices: names
              ,
              message: "Which employee would you like to pick?"
        }]).then(function(result){
        
            let employeeId = employeeInfo.filter(x => x.id == result.name.split(" ")[0]);
            employeeId = employeeId[0].id;
            // console.log(employeeId);

            
            connection.query('SELECT id, title FROM role',
                (err, results) => {
                   roleInfo = results;
                   const roles = roleInfo.map(x => `${x.id} ${x.title}`);
        
                   inquirer.prompt([{
                    name: 'role',
                    type: 'list',
                    choices: roles
                      ,
                      message: "Which role would you like to pick?"
                }]).then(function(result){
               
                    let roleId = roleInfo.filter(x => x.title == result.role.split(" ")[1]);
                    roleId = roleId[0].id;
                    // console.log(roleId);

                    connection.query('UPDATE employee SET ? WHERE ?',
                    [
                        {
                            role_id: roleId
                        },
                        {
                            id: employeeId
                        }
                    ],
                    (err) => {
                        if (err) throw err;
                        console.log('Updated employee role!');
                        openPrompt();
                    }
                    )
                })
                }
            )
        })
        }
    )

}



connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    // connection.end();
    openPrompt();
  });