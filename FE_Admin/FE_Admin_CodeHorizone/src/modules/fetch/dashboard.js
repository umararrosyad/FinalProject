// const axios = require('axios');

import { instance as axios } from "../axios";
const getShortProduct = async (limit, short) => {
  try {
    const params = {
      limit,
      short
    };
    const response = await axios.get("/api/v1/products/", { params });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const getData = async () => {
    try {
      const response = await axios.get(`/api/v1/dashboard/`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

module.exports = { getShortProduct, getData };
