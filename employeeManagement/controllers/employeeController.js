const db = require('../db');

exports.list = (req, res) => {
  db.query('SELECT * FROM employee', (err, results) => {
    if (err) {
      console.error('Error fetching employee:', err);
      return res.status(500).send('Internal Server Error');
    }
    res.render('index', { employees: results });
  });
};

exports.showAddForm = (req, res) => {
  res.render('add');
};

exports.add = (req, res) => {
  const { name, email, phone } = req.body;
  db.query('INSERT INTO employee (name, email, phone) VALUES (?, ?, ?)', [name, email, phone], (err) => {
    if (err) throw err;
    res.redirect('/');
  });
};

exports.showEditForm = (req, res) => {
  db.query('SELECT * FROM employee WHERE id = ?', [req.params.id], (err, results) => {
    if (err) throw err;
    res.render('edit', { employee: results[0] });
  });
};

exports.update = (req, res) => {
  const { name, email, phone } = req.body;
  db.query(
    'UPDATE employee SET name = ?, email = ?, phone = ? WHERE id = ?',
    [name, email, phone, req.params.id],
    (err) => {
      if (err) throw err;
      res.redirect('/');
    }
  );
};

exports.delete = (req, res) => {
  db.query('DELETE FROM employee WHERE id = ?', [req.params.id], (err) => {
    if (err) throw err;
    res.redirect('/');
  });
};
