DROP DATABASE IF EXISTS management_db;

CREATE DATABASE management_db;

USE management_db;

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    employee_name VARCHAR(100) NOT NULL
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    employee_id INT,
    role_name TEXT NOT NULL,
    FOREIGN KEY (employee_id)
    REFERENCES (employee_id)
    ON DELETE SET NULL
);

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    employee_id INT,
    department_name TEXT NOT NULL,
    FOREIGN KEY (employee_id)
    REFERENCES employees(id)
    ON DELETE SET NULL
);