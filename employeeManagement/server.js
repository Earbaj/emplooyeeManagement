/*
Title: Server Module for Employee Management System
Description: This module sets up the Express server for the employee management system, handling routes and middleware.
Author: Earbaj Md Saria
Date: 5-jul-2025
*/


// dependancy

const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

// Create an instance of the Express application
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

// Home show Employee list
app.get('/', (req,res) => {
    db.query('select * from employee',(err, result)=>{
        if(err){
            console.error('Error fetching employee:', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.render('index', { employees: result });
        }
    });
});

// Add Employee Form
app.get('/add', (req, res) => {
  res.render('add');
});

// Add Employee (POST)
app.post('/add', (req, res) => {
  const { name, email, phone } = req.body;
  db.query('INSERT INTO employee (name, email, phone) VALUES (?, ?, ?)', [name, email, phone], (err) => {
    if (err) throw err;
    res.redirect('/');
  });
});

// Edit Form
app.get('/edit/:id', (req, res) => {
  db.query('SELECT * FROM employee WHERE id = ?', [req.params.id], (err, results) => {
    if (err) throw err;
    res.render('edit', { employee: results[0] });
  });
});

// Update Employee
app.post('/edit/:id', (req, res) => {
  const { name, email, phone } = req.body;
  db.query(
    'UPDATE employee SET name = ?, email = ?, phone = ? WHERE id = ?',
    [name, email, phone, req.params.id],
    (err) => {
      if (err) throw err;
      res.redirect('/');
    }
  );
});

// Delete Employee
app.get('/delete/:id', (req, res) => {
  db.query('DELETE FROM employee WHERE id = ?', [req.params.id], (err) => {
    if (err) throw err;
    res.redirect('/');
  });
});

// Start Server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
