const express = require("express");
const router = express.Router();
const deviceController = require("../controllers/Device")

router.post('/control', deviceController.controlDevice);
router.get('/data', deviceController.getInfoUser);
router.get('/units', deviceController.getAllUnits);
router.get('/devices/:id', deviceController.getOneDevice);
router.post('/scenarios/:id/actions', deviceController.controlScenari);
module.exports=router;