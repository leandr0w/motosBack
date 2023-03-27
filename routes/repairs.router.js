const express = require('express');
const repairController = require('./../controllers/repairs.controllers');
const repairsMidlleware = require('./../middlewares/repair.middleware');
const router = express.Router();

router
  .route('/')
  .get(repairController.findAllRepair)
  .post(repairController.createRepair);

router
  .route('/:id')
  .get(repairsMidlleware.validExistRepair, repairController.findOneRepair)
  .patch(repairsMidlleware.validExistRepair, repairController.updateRepair)
  .delete(repairsMidlleware.validExistRepair, repairController.deleteRepair);

module.exports = router;
