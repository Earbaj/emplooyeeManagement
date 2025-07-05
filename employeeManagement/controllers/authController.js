const bcrypt = require('bcryptjs');
const db = require('../db');

exports.showLogin = (req, res) => {
  if (req.session.user) return res.redirect('/');
  res.render('login', { message: '' });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) throw err;
    if (results.length === 0 || !(await bcrypt.compare(password, results[0].password))) {
      return res.render('login', { message: 'Invalid email or password' });
    }
    req.session.user = results[0];
    res.redirect('/');
  });
};

exports.showRegister = (req, res) => {
  res.render('register', { message: '' });
};

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword], (err) => {
    if (err) return res.render('register', { message: 'Email already exists!' });
    res.redirect('/login');
  });
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};
