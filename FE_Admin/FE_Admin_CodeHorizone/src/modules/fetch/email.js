// const axios = require('axios');

import axios from "axios";
const sendVerification = async (data) => {
  try {
    await axios
      .post("https://api.emailjs.com/api/v1.0/email/send", data)
      .then((response) => {
        console.log("Your mail is sent!", response);
      })
      .catch((error) => {
        console.log("Oops... " + error);
      });
  } catch (error) {
    console.error(error);
  }
};

const getOneTransaction = async (id) => {
  try {
    console.log(id);
    const response = await axios.get(`/api/v1/transactions/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const createSizes = async (id, size_name) => {
  try {
    const requestData = {
      size_name
    };
    const response = await axios.post(`/api/v1/products/${id}/sizes`, requestData, {
      headers: { "Content-Type": "application/json" }
    });
    console.log(requestData);

    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const updateTransaction = async (id, transaction_status) => {
  try {
    const requestData = {
      transaction_status
    };
    const response = await axios.post(`/api/v1/transactions/${id}`, requestData, {
      headers: { "Content-Type": "application/json" }
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

const deleteSizes = async (id, size_id) => {
  try {
    const response = await axios.delete(`/api/v1/products/${id}/sizes/${size_id}`, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    // console.log(response)
    return response;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { sendVerification, updateTransaction, getOneTransaction };
