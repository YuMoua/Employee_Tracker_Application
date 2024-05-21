INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Smith', 'John Doe'),
    ('Sally', 'Jones'),
    ('Tom', 'Cruise'),
    ('Victoria', 'VonDoom');

INSERT INTO roles (title, salary_amount, department_id)
VALUES ('Sales', 70000, 2),
('Warehouse Associate', 35000, 1),
('Forklift Operator', 41000, 1),
(4, 42000, 2),
(5, 97000, 3)

INSERT INTO departments (department_id, department_name)
VALUES 
(1, 'Warehouse'),
(2, 'Sales'),
(3, 'Management')