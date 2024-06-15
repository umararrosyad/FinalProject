// const axios = require('axios');

import { instance as axios } from "../axios";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImlhdCI6MTcwNjc5MDczNn0.crNpraUq0j84lSvWzqQAVdmx1JOWsZmRa4kwpChEpZU";

const login = async (email, password) => {
  try {
    const requestData = {
      email,
      password
    };

    const response = await axios.post(`/api/v1/users/login`, requestData, {
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

const getUser = async (id) => {
  try {
    const response = await axios.get(`/api/v1/users/${id}`, {
      headers: { "Content-Type": "application/json" }
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};


const register = async (email, password, name, phone_number, username) => {
  try {
    const requestData = {
      email,
      password,
      name,
      phone_number,
      username
    };

    const response = await axios.post(`/api/v1/users/register`, requestData, {
      headers: { "Content-Type": "application/json" },
    });
    console.log(requestData);
    console.log(requestData);

    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};


module.exports = { login, register, getUser };
