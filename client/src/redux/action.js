import {
  GET_ALL_CATEGORIES,
  POST_PRODUCT,
  APPLY_FILTER,
  RESET_FILTER,
  EMPTY_FILTER,
  DELETE_PRODUCT,
  GET_ALL_PRODUCTS,
  PUT_PRODUCT,
  DELETE_CATEGORY,
  POST_CATEGORY,
  PUT_CATEGORY,
} from "./actionsTypes";

import axios from "axios";

export const getAllCategories = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("http://localhost:3001/api/categories");

      dispatch({
        type: GET_ALL_CATEGORIES,
        payload: data.Items,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const postProduct = (product) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3001/api/products",
        product
      );
      console.log(data);
      return dispatch({
        type: POST_PRODUCT,
        payload: data.product,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const applySettings = (settings) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("http://localhost:3001/api/products", {
        params: settings,
      });

      return dispatch({
        type: APPLY_FILTER,
        payload: { data, settings },
      });
    } catch (error) {
      console.log(error.message);
      return dispatch({
        type: EMPTY_FILTER,
        payload: settings,
      });
    }
  };
};

export const resetSettings = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("http://localhost:3001/api/products", {
        params: { sortOrder: "ASC" },
      });
      return dispatch({
        type: RESET_FILTER,
        payload: { data },
      });
    } catch (error) {
      console.log(error.message);
      return dispatch({
        type: EMPTY_FILTER,
        payload: settings,
      });
    }
  };
};

export const deleteProduct = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:3001/api/products/delete/${id}`
      );

      return dispatch({
        type: DELETE_PRODUCT,
        payload: data.products,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getAllProducts = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("http://localhost:3001/api/products");
      return dispatch({
        type: GET_ALL_PRODUCTS,
        payload: data.Items,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const putProduct = (id, product) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(
        `http://localhost:3001/api/products/update/${id}`,
        product
      );
      return dispatch({
        type: PUT_PRODUCT,
        payload: data.products,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const deleteCategory = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:3001/api/categories/${id}`
      );
      return dispatch({
        type: DELETE_CATEGORY,
        payload: data.categories,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const postCategory = (categoryForm) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3001/api/categories",
        categoryForm
      );

      return dispatch({
        type: POST_CATEGORY,
        payload: data.response,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const putCategory = (id, category) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(
        `http://localhost:3001/api/categories/${id}`,
        category
      );
      return dispatch({
        type: PUT_CATEGORY,
        payload: data.categories,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};
