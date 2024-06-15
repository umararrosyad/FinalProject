// const axios = require('axios');

import { instance as axios } from "../axios";

const getFeedbackProduct = async (product_id) => {
  try {
    const response = await axios.get(`/api/v1/products/${product_id}/feedbacks`, {
      headers: { "Content-Type": "application/json" },
    });

    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const createFeedback = async (product_id, user_id, product_variant_id, feedback, rating) => {
  try {
    const requestData = {
      user_id,
      product_variant_id,
      feedback,
      rating,
    };
    const response = await axios.post(`/api/v1/products/${product_id}/feedbacks`, requestData, {
      headers: { "Content-Type": "application/json" },
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getFeedbackProduct, createFeedback };
