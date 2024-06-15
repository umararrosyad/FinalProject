// const axios = require('axios');

import { instance as axios } from "../axios";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImlhdCI6MTcwNjc5MDczNn0.crNpraUq0j84lSvWzqQAVdmx1JOWsZmRa4kwpChEpZU";
const getAllGalleries = async (id) => {
  try {
    const response = await axios.get(`/api/v1/products/${id}/galleries`);
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

const createGalleries = async (id,formData) => {
  try {
    const response = await axios.post(`/api/v1/products/${id}/galleries`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    console.log(response);

    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const deleteGalleries = async (id, galleries_id) => {
  try {
    const response = await axios.delete(`/api/v1/products/${id}/galleries/${galleries_id}`, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    // console.log(response)
    return response;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getAllGalleries, createGalleries, deleteGalleries };
