const express = require('express');
const router = express.Router();
const emp = require('../controllers/employeeController');

// Middleware to protect routes
function isAuthenticated(req, res, next) {
  if (req.session.user) return next();
  res.redirect('/login');
}

router.get('/', isAuthenticated, emp.list);
router.get('/add', isAuthenticated, emp.showAddForm);
router.post('/add', isAuthenticated, emp.add);
router.get('/edit/:id', isAuthenticated, emp.showEditForm);
router.post('/edit/:id', isAuthenticated, emp.update);
router.get('/delete/:id', isAuthenticated, emp.delete);

module.exports = router;
