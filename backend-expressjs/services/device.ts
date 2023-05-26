const axios = require('axios');

const Device = require('../models/device');

// getAllDevices from MongoDb
const getAllUnits = async () => {
  try {
    const devices = await Device.find();
    return devices;
  } catch (error) {
    throw new Error('Failed to fetch devices');
  }
};

const getInfoUser = async () => {
  const token = process.env.YANDEX_TOKEN;
  try {
    const response = await axios.get('https://api.iot.yandex.net/v1.0/user/info', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: 'Unable to get info about user',
    };
  }
};

const getOneDevice = async (deviceId) => {
  const token = process.env.YANDEX_TOKEN;
  try {
    const response = await axios.get(`https://api.iot.yandex.net/v1.0/devices/${deviceId}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    console.log(error);
    return {
      status: false,
      message: 'Unable to get device',
    };
  }
};

const controlDevice = async (body) => {
  const token = process.env.YANDEX_TOKEN;
  try {
    const response = await axios.post('https://api.iot.yandex.net/v1.0/devices/actions', body, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: 'Unable to control device',
    };
  }
};

const controlScenari = async (scenariId) => {
  const token = process.env.YANDEX_TOKEN;
  try {
    const response = await axios.post(
      `https://api.iot.yandex.net/v1.0/scenarios/${scenariId}/actions`,
      scenariId,
      {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return {
      status: false,
      message: 'Unable to control scenari',
    };
  }
};

module.exports = { getAllUnits, getInfoUser, getOneDevice, controlDevice, controlScenari };
