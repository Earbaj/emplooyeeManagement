
/*
Title: Employee Management Database Module,
Description: This module handles the database operations for the employee management system.
Author: Earbaj Md Saria
Date: 5-jul-2025
*/

const mysql = require('mysql2');

const coonnection = mysql.createConnection({
    host: 'localhost',
    user: 'saria',
    password: '',
    database: 'earbaj_db',
});

coonnection.connect((err) => {
    if(err){
        console.error('Error connecting to the database:', err);
    }else{
        console.log('Connected to the database successfully.');
    }
});

module.exports = coonnection;