const deviceServices = require('../services/device');

exports.getAllUnits = async (req, res, next) => {
  try {
    const units = await deviceServices.getAllUnits();
    res.status(200).json(units);
  } catch (error) {
    next(error);
  }
};


//function controlDevice for control devices
exports.controlDevice = async (req, res) => {
  const response = await deviceServices.controlDevice(req.body);
  res.json(response);
};

//function getInfoUser for reading all data from yandexAPI
exports.getInfoUser = async (req, res) => {
  const response = await deviceServices.getInfoUser();
  res.json(response);
};

// function getOneDevice for reading data about device
exports.getOneDevice = async (req, res) => {
  const response = await deviceServices.getOneDevice(req.params.id);
  res.json(response);
};

// function controlScenari for open/close scenarios of device
exports.controlScenari = async (req, res) => {
  const response = await deviceServices.controlScenari(req.params.id);
  res.json(response);
};
