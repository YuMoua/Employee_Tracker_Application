const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');

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
    }
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
    const query = 'SELECT * FROM departments';
    db.query(query, (err, results) => {
        if (err) throw err;
        console.table(results);
        startProgram();
    })
}



function viewRoles() {
    const query = 'SELECT * FROM roles';
    db.query(query, (err, results) => {
        if (err) throw err;
        console.table(results);
        startProgram();
    })
}

function viewEmployees() {
    const query = 'SELECT * FROM employees';
    db.query(query, (err, results) => {
        if (err) throw err;
        console.table(results);
        startProgram();
    })

}

function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'departmentName',
            message: 'Enter the new Department:',
        }
    ]).then(response => {
        const query = 'INSERT INTO departments (department_name) VALUES (?)';
        db.query(query, [response.departmentName], (err, results) => {
            if (err) throw err;
            // console.log('Department created:', results);
        })
        startProgram();
    }).catch(error => {
        console.error('Error', error);
    });

}

function addRole() {
    db.query('SELECT * FROM departments', (err, results) => {
        if (err) throw err;
        // console.table(results)

        const possibleDepartments = results.map(row => ({ name: row.department_name, value: row.department_id }))
        inquirer.prompt([
            {
                type: 'input',
                name: 'addedRole',
                message: 'Enter the new role:',
            },
            {
                type: 'input',
                name: 'newSalary',
                message: 'Enter the Salary Amount:',
                filter: function (salary) {
                    return parseFloat(salary)
                }
            },
            {
                type: 'list',
                name: 'departments',
                message: 'Enter the department this role will be in:',
                choices: possibleDepartments
            }
        ]).then(response => {
            const query = 'INSERT INTO roles (title, salary_amount, department_id) VALUES (?, ?, ?)';
            db.query(query, [response.addedRole, response.newSalary, response.departments], (err, results) => {
                if (err) throw err;
                console.log('Entry created:', results.insertId);
            })
            startProgram();

        }).catch(error => {
            console.error('Error', error);
        });

    })

}



function addEmployee() {
    db.query('SELECT * FROM roles', (err, results) => {
        if (err)
            throw err;
        // console.table(results)

        const currentRoles = results.map(row => ({ name: row.title, value: row.id }))

        findEmployees().then(currentEmployees => {


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
                    choices: currentRoles
                },
                {
                    type: 'list',
                    name: 'newManager',
                    message: 'Enter the manager for this employee:',
                    choices: [{ name: 'None', value: null }, ...currentEmployees]
                    // have to find a way to put a none so that they can become managers
                }
            ]).then(response => {
                const query = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
                db.query(query, [response.firstName, response.lastName, response.employeeRole, response.newManager], (err, results) => {
                    if (err) throw err;
                    console.log('Entry created:', results.insertId);
                })
                startProgram();
            }).catch(error => {
                console.error('Error', error);
            });
        }).catch(error => {
            console.error('Error', error);
        });
    })
}

function findEmployees() {
    return new Promise((resolve, reject) => {

        const query = 'SELECT * FROM employees';
        db.query(query, (err, results) => {
            if (err) {
                reject(err);
            } else {
                const currentEmployees = results.map(row => ({ name: `${row.first_name} ${row.last_name}`, value: row.id }))
                resolve(currentEmployees)
            }
        });
    });

}
function updateEmployee() {
    db.query('SELECT * FROM employees', (err, results) => {
        if (err) throw err;
        // console.table(results)
        
        const currentEmployees = results.map(row => ({ name: `${row.first_name} ${row.last_name}`, value: row.employee_id }))
        console.log(results);
        
        inquirer.prompt([
            {
                type: 'list',
                name: 'updatedEmployee',
                message: 'Which Employee do you want to update:',
                choices: currentEmployees
            },
            {
                type: 'list',
                name: 'newUpdate',
                message: 'What do you want updated for this employee:',
                choices: ['Remove Employee']
            }
        ]).then(choice => {

            console.table(choice);



            switch (choice.newUpdate) {
                case 'Remove Employee':
                    removeEmployee(choice.updatedEmployee);
                    break;
                // case 'Change Role':
                //     changeRole();
                //     break;
            }
        }
        )
    })
}

function removeEmployee(employeeId) {
    db.query('DELETE FROM employees WHERE employee_id = ?', [employeeId], (err, results) => {
        if (err) {
            console.error('Error deleting employee:', err);
            return;
        }
        console.log('Employee removed successfully');
        startProgram();
    });
}





startProgram()