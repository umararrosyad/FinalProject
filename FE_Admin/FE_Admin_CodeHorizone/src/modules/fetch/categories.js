// const axios = require('axios');

import { instance as axios } from "../axios";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImlhdCI6MTcwNjc5MDczNn0.crNpraUq0j84lSvWzqQAVdmx1JOWsZmRa4kwpChEpZU";
const getAllCategories = async (page, searchTerm) => {
  try {
    const params = {
      page,
      name: searchTerm
    };
    const response = await axios.get("/api/v1/categories/", { params });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const createCategory = async (formData) => {
  try {
    const response = await axios.post("/api/v1/categories", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    // console.log(response)
    return response;
  } catch (error) {
    console.error(error);
  }
};

const updateCategory = async (id, formData) => {
  try {
    const response = await axios.put(`/api/v1/categories/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    // console.log(response)
    return response;
  } catch (error) {
    console.error(error);
  }
};

const deleteCategory = async (id) => {
  try {
    const response = await axios.delete(`/api/v1/categories/${id}`, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    // console.log(response)
    return response;
  } catch (error) {
    console.error(error);
  }
};


module.exports = { getAllCategories, createCategory, updateCategory, deleteCategory };
