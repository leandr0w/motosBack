const express = require('express');
const usersControllers = require('./../controllers/users.controllers');
const usersMiddllewares = require('./../middlewares/users.middlewares');
const validationMiddleware = require('./../middlewares/validation.middleware');
const authController = require('./../controllers/auth.controller');
const authMiddleware = require('./../middlewares/auth.middleware');
const router = express.Router();

router
  .route('/')
  .get(usersControllers.finAllUsers)
  .post(validationMiddleware.createUserValidation, authController.signup);

router.post('/login', authController.login);

router
  .route('/:id')
  .get(usersMiddllewares.validExistUser, usersControllers.finOneUser)
  .patch(
    usersMiddllewares.validExistUser,
    validationMiddleware.updateUserValidation,
    authMiddleware.protectAccountOwner,
    usersControllers.updateUser
  )
  .delete(
    usersMiddllewares.validExistUser,
    authMiddleware.protectAccountOwner,
    usersControllers.deleteUser
  );

module.exports = router;
