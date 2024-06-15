// const axios = require('axios');

import { instance as axios } from "../axios";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImlhdCI6MTcwNjc5MDczNn0.crNpraUq0j84lSvWzqQAVdmx1JOWsZmRa4kwpChEpZU";
const getAllVariant = async (id) => {
  try {
    const response = await axios.get(`/api/v1/products/${id}/variants`);
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

const createProducts = async (name, category_id, werehouse_id, description) => {
  try {
    const requestData = {
      name,
      category_id,
      werehouse_id,
      description
    };
    const response = await axios.post("/api/v1/products", requestData, {
        headers: { "Content-Type": "application/json" }
    });
    console.log(requestData);
    
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const updateVariant = async (id, variant_id, weight, price, stock) => {
  try {
    const requestData = {
        weight, price, stock
    };
    const response = await axios.put(`/api/v1/products/${id}/variants/${variant_id}`, requestData, {
      headers: { "Content-Type": "application/json" }
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

const deleteProducts = async (id) => {
  try {
    const response = await axios.delete(`/api/v1/products/${id}`, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    // console.log(response)
    return response;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getAllVariant, createProducts,getOneProducts, updateVariant, deleteProducts };
