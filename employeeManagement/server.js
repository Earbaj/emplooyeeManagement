/*
Title: Server Module for Employee Management System
Description: This module sets up the Express server for the employee management system, handling routes and middleware.
Author: Earbaj Md Saria
Date: 5-jul-2025
*/


// dependancy
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();

// Routes
const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes');

// Setup
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use(session({
  secret: 'mySecretKey',
  resave: false,
  saveUninitialized: true
}));

// Use Routes
app.use(authRoutes);
app.use(employeeRoutes);

// Start Server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
