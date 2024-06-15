
// const axios = require('axios');

import { instance as axios } from "../axios";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImlhdCI6MTcwNjc5MDczNn0.crNpraUq0j84lSvWzqQAVdmx1JOWsZmRa4kwpChEpZU";
const getCity = async (province_id) => {
  try {
    const response = await axios.get(`/api/v1/rajaongkirs/cities`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const getProvince = async () => {
    try {
      const response = await axios.get(`/api/v1/rajaongkirs/provinces/`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };


module.exports = { getCity, getProvince};
