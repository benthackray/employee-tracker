INSERT INTO department (name) VALUES ("IT"), ("Customer Service"), ("Accounting");

INSERT INTO role (title, salary, department_id) VALUES 
("President", 100000, 1), 
("Programmer", 80000, 1), 
("Supervisor", 60000, 2), 
("Representative", 50000, 2), 
("Accountant", 60000, 3), 
("Intern", 40000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
("Leslie", "Knope", 1, NULL), 
("Liz", "Lemon", 2, 1), 
("Brad", "Pitt", 2, 1), 
("Johnny", "Tsunami", 2, 1), 
("Nicole", "Byer", 3, 1),
("Sasheer", "Zamada", 3, 1),
("Oscar", "Montoya", 4, 5),
("Robert", "Smith", 4, 5),
("Sally", "Jones", 4, 6),
("Brenda", "Song", 4, 6),
("Ashley", "Tisdale", 4, 6),
("Dylan", "Sprouse", 5, 1),
("Cole", "Sprouse", 5, 12),
("Antonio", "Banderas", 6, 2),
("Ariana", "Grande", 6, 2),
("Lady", "Gaga", 6, 3),
("Lil Nas", "X", 6, 3),
("Ricky", "Martin", 6, 4);
