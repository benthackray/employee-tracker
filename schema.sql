DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;
USE employeeDB;


-- department:
CREATE TABLE department (
    -- id - INT 
    id INT AUTO_INCREMENT NOT NULL,
    -- name - VARCHAR(30) to hold department name
    name VARCHAR(30) NOT NULL,
    -- PRIMARY KEY
    PRIMARY KEY (id)
);
    -- role:
CREATE TABLE role (
    -- id - INT 
    id INT AUTO_INCREMENT NOT NULL,
    -- title - VARCHAR(30) to hold role title
    title VARCHAR(30) NOT NULL,
    -- salary - DECIMAL to hold role salary
    salary DECIMAL(10,2) NOT NULL,
    -- PRIMARY KEY
    PRIMARY KEY (id),
    -- department_id - INT to hold reference to department role belongs to
    department_id INT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

-- employee:
CREATE TABLE employee (
    -- id - INT 
    id INT AUTO_INCREMENT NOT NULL,
    -- first_name - VARCHAR(30) to hold employee first name
    first_name VARCHAR(30) NOT NULL,
    -- last_name - VARCHAR(30) to hold employee last name
    last_name VARCHAR(30) NOT NULL,
    -- PRIMARY KEY
    PRIMARY KEY (id),
    -- role_id - INT to hold reference to role employee has
    role_id INT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES role(id),
    -- manager_id - INT to hold reference to another employee that manages the employee being Created. This field may be null if the employee has no manager
    manager_id INT NULL,
    FOREIGN KEY (manager_id) REFERENCES employee(id)

);