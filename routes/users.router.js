const express = require('express');
const usersControllers = require('./../controllers/users.controllers');
const usersMiddllewares = require('./../middlewares/users.middlewares');
const router = express.Router();

router
  .route('/')
  .get(usersControllers.finAllUsers)
  .post(usersControllers.createUser);

router
  .route('/:id')
  .get(usersMiddllewares.validExistUser, usersControllers.finOneUser)
  .patch(usersMiddllewares.validExistUser, usersControllers.updateUser)
  .delete(usersMiddllewares.validExistUser, usersControllers.deleteUser);

module.exports = router;
