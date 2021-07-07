DROP DATABASE IF EXISTS employeeDB;
CREATE DATABASE employeeDB;
USE employeeDB;


-- department:
CREATE TABLE department (
    -- id - INT PRIMARY KEY
    id INT AUTO_INCREMENT,
    -- name - VARCHAR(30) to hold department name
    name VARCHAR(30),
    PRIMARY KEY (id)
)
    -- role:
CREATE TABLE role (
    -- id - INT PRIMARY KEY
    id INT AUTO_INCREMENT,
    -- title - VARCHAR(30) to hold role title
    title VARCHAR(30),
    -- salary - DECIMAL to hold role salary
    salary DECIMAL(6,2),
    -- department_id - INT to hold reference to department role belongs to
    PRIMARY KEY (id)
)

-- employee:
CREATE TABLE employee (
    -- id - INT PRIMARY KEY
    id INT AUTO_INCREMENT,
    -- first_name - VARCHAR(30) to hold employee first name
    first_name VARCHAR(30),
    -- last_name - VARCHAR(30) to hold employee last name
    last_name VARCHAR(30),
    -- role_id - INT to hold reference to role employee has
    role_id INT,
    -- manager_id - INT to hold reference to another employee that manages the employee being Created. This field may be null if the employee has no manager
    manager_id INT
)