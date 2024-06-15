// const axios = require('axios');

import { instance as axios } from "../axios";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImlhdCI6MTcwNjc5MDczNn0.crNpraUq0j84lSvWzqQAVdmx1JOWsZmRa4kwpChEpZU";
const getAllSizes = async (id) => {
  try {
    const response = await axios.get(`/api/v1/products/${id}/sizes`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const getOneProducts = async (id) => {
    try {
      const response = await axios.get(`/api/v1/products/${id}`);
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

const updateProducts = async (id, name, category_id, werehouse_id, description) => {
  try {
    const requestData = {
      name,
      category_id,
      werehouse_id,
      description
    };
    const response = await axios.put(`/api/v1/products/${id}`, requestData, {
      headers: { "Content-Type": "application/json" }
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

const deleteSizes = async (id,size_id) => {
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

module.exports = { getAllSizes, createSizes,getOneProducts, updateProducts, deleteSizes };
