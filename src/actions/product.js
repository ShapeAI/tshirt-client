import toast from "react-hot-toast";
import axios from "../axiosInstance";

export const deleteProduct = (productId) => {
  return {
    type: "DELETE_PRODUCT",
    payload: { productId },
  };
};

export const addProduct = (product) => async (dispatch) => {
  try {
    dispatch({
      type: "SET_LOADING",
      payload: { state: true },
    });
    const res = await axios.post("/product/add", product);

    dispatch({
      type: "ADD_PRODUCT",
      payload: { product },
    });
    toast.success("Product added");
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  } finally {
    dispatch({
      type: "SET_LOADING",
      payload: { state: false },
    });
  }
};

export const getProducts = (name, description) => async (dispatch) => {
  const res = await axios.get("/product/all");

  const { products } = res.data;
  dispatch({
    type: "GET_PRODUCTS",
    payload: { products },
  });
};
