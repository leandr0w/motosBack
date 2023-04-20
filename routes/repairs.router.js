const express = require('express');
const repairController = require('./../controllers/repairs.controllers');
const repairsMidlleware = require('./../middlewares/repair.middleware');
const authMiddleware = require('./../middlewares/auth.middleware');
const router = express.Router();

router.post(repairController.createRepair);

router.use(authMiddleware.protect);

router.get(
  '/',
  authMiddleware.restrictTo('employee'),
  repairController.findAllRepair
);

router
  .route('/:id')
  .get(
    repairsMidlleware.validExistRepair,
    authMiddleware.restrictTo('employee'),
    repairController.findOneRepair
  )
  .patch(
    repairsMidlleware.validExistRepair,
    authMiddleware.restrictTo('employee'),
    repairController.updateRepair
  )
  .delete(
    repairsMidlleware.validExistRepair,
    authMiddleware.restrictTo('employee'),
    repairController.deleteRepair
  );

module.exports = router;
