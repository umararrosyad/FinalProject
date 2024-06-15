// const axios = require('axios');

import { instance as axios } from "../axios";
const getAddressUser = async (id) => {
  try {
    const response = await axios.get(`/api/v1/users/${id}/addresses`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const createCart = async (id, product_variant_id, qty) => {
  try {
    const requestData = {
      product_variant_id,
      qty
    };
    const response = await axios.post(
      `/api/v1/users/${id}/carts`,
      requestData ,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    // console.log(response)
    return response;
  } catch (error) {
    console.error(error);
  }
};

const updateCategory = async (id, product_variant_id, qty) => {
  try {
    const params = {
      product_variant_id,
      qty,
    };
    const response = await axios.put(
      `/api/v1/categories/${id}`,
      { params },
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    // console.log(response)
    return response;
  } catch (error) {
    console.error(error);
  }
};

const deleteCart = async (id, cart_id) => {
  try {
    const response = await axios.delete(`/api/v1/users/${id}/carts/${cart_id}`, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    // console.log(response)
    return response;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getAddressUser  };
