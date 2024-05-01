const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'rootroot',
        database: 'management_db',
    },
    console.log(`Connected to the management Database`)
);


app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

function startProgram() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'menuSelect',
            message: 'What do you want to do?',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee']
        }
    ])
    .then(choice => {
        switch (choice.menuSelect) {
            case 'View All Departments':
                viewDepartments();
                break;
            case 'View All Roles':
                viewRoles();
                break;
            case 'View All Employees':
                viewEmployees();
                break;
            case 'Add A Department':
                addDepartment();
                break;
            case 'Add A Role':
                addRole();
                break;
            case 'Add An Employee':
                addEmployee();
                break;
            case 'Update An Employee':
                updateEmployee();
                break;
        }
    }).catch(error => {
        console.error('Error', error);
    });
}


function viewDepartments() {

}

function viewRoles() {

}

function viewEmployees() {

}

function addDepartment() {

}

function addRole() {

}

function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'Enter the new Employees first name:',
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Enter the new Employees last name:',
        },
        {
            type: 'list',
            name: 'employeeRole',
            message: 'Enter the new Employees role:',
            choices: ['Warehouse', 'Warehouse Management', 'Sales', 'Sales Management']
        }
    ]).then(response => {
        const firstNameQuery = 'INSERT INTO management_db (first_name) VALUES (?)';
        connection.query(firstNameQuery, [response.firstName], (err, results) => {
            if (err) throw err;
            console.log('Entry created:', results.insertId);
        })
        
        const lastNameQuery = 'INSERT INTO management_db (last_name) VALUES (?)';
        connection.query(lastNameQuery, [response.firstName], (err, results) => {
            if (err) throw err;
            console.log('Entry created:', results.insertId);
        })

        const employeeRoleQuery = 'INSERT INTO management_db (last_name) VALUES (?)';
        connection.query(employeeRoleQuery, [response.employeeRole], (err, results) => {
            if (err) throw err;
            console.log('Entry created:', results.insertId);
        })
    });
}

function updateEmployee() {

}








startProgram()