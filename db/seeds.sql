INSERT INTO employees (employee_name)
VALUES ("John Smith"),
    ('Sally Jones'),
    ('Tom Cruise'),
    ('Victoria Von Doom');

INSERT INTO roles (employee_id, role_name, department_name)
VALUES (1, 'Salesman'),
(2, 'Warehouse Associate'),
(3, 'Forklift Driver'),
(4, 'Customer Service');

INSERT INTO departments (employee_id, department_name)
VALUES (1, 'Sales'),
(2, 'Warehouse'),
(3, 'Warehouse'),
(4, 'Sales');