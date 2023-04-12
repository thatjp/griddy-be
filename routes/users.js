// const express = require('express');
// const { body, validationResult } = require('express-validator');

// const {
//   getAllUsers,
//   getSingleUserById,
//   createUser,
//   updateUser,
//   deleteUser
// } = require('../controllers/users');

// const router = express.Router();

// router
//   .route('/')
//   .get(getAllUsers)
//   .post(createUser);

// router
//   .route('/:id')
//   .get(getSingleUserById)
//   .put(updateUser)
//   .delete(deleteUser);

// module.exports = router;

const express = require('express');
const app = express();

app.use(express.json());
app.post('/user', (req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password,
  }).then(user => res.json(user));
});
