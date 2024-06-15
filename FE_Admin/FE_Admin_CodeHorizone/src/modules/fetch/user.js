// const axios = require('axios');

import { instance as axios } from "../axios";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImlhdCI6MTcwNjc5MDczNn0.crNpraUq0j84lSvWzqQAVdmx1JOWsZmRa4kwpChEpZU";
const getAllUsers = async (page, searchTerm) => {
  try {
    const params = {
      page,
      name: searchTerm
    };
    const response = await axios.get(`/api/v1/users/`, { params });
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

const createTypes = async (id, formData) => {
  try {
    const response = await axios.post(`/api/v1/products/${id}/types`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    console.log(requestData);

    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const login = async (email, password) => {
  try {
    const requestData = {
      email,
      password
    };

    const response = await axios.post(`/api/v1/users/admin/login`, requestData, {
      headers: { "Content-Type": "application/json" }
    });
    console.log(requestData)
    console.log(requestData);

    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};

const updateTypes = async (id, type_id, formData) => {
  try {
    const response = await axios.put(`/api/v1/products/${id}/types/${type_id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

const deleteTypes = async (id, type_id) => {
  try {
    const response = await axios.delete(`/api/v1/products/${id}/types/${type_id}`, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    // console.log(response)
    return response;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { login, getAllUsers, createTypes, getOneProducts, updateTypes, deleteTypes };
