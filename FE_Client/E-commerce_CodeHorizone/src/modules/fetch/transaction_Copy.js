// const axios = require('axios');

import { instance as axios } from "../axios";
const getAllTransaction = async (id, status, page) => {
  try {
    const params = {
      page,
      status,
    };
    const response = await axios.get(`/api/v1//transactions/`, { params });
    console.log(response.data);
    return response.data;
  } catch (error) {
    return error.response.data;
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

const uploadBukti = async (user_id, id, formData) => {
  try {
    console.log(user_id, id);
    const response = await axios.put(`/api/v1/users/${user_id}/transactions/${id}/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(response);

    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};



const updateTransaction = async (user_id,id, transaction_status) => {
  try {
    const requestData = {
      transaction_status,
    };
    const response = await axios.put(`/api/v1/users/${user_id}/transactions/${id}`, requestData, {
      headers: { "Content-Type": "application/json" },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

const deleteTransaction = async (id, transaction_id) => {
  try {
    const response = await axios.delete(`/api/v1/users/${id}/transactions/${transaction_id}`, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    // console.log(response)
    return response;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getAllTransaction, updateTransaction, getOneTransaction, deleteTransaction, uploadBukti };
