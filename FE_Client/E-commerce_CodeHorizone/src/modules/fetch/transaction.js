// const axios = require('axios');

import { instance as axios } from "../axios";

const createTransaction = async (id, addresses_id, product_price, shipping_price, total_price, transaction_detail) => {
  try {
    const requestData = {
      addresses_id,
      product_price,
      shipping_price,
      total_price,
      transaction_detail,
    };
    const response = await axios.post(`/api/v1/users/${id}/transactions`, requestData, {
      headers: { "Content-Type": "application/json" },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { createTransaction };
