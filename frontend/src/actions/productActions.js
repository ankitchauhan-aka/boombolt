import axios from "axios";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  SINGLE_PRODUCT_LIST_REQUEST,
  SINGLE_PRODUCT_LIST_SUCCESS,
  SINGLE_PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
  BRAND_PRODUCT_DETAILS_REQUEST,
  WISH_LIST_REQUEST,
  WISH_LIST_SUCCESS,
  WISH_LIST_FAIL,
  LIST_PRODUCT_FAIL,
  LIST_PRODUCT_REQUEST,
  LIST_PRODUCT_SUCCESS
} from "../constants/productConstants";
export const listProducts = (
  cetegory = "",
  keyword = "",
  pageNumber = "",
  price = { min: "", max: "", maximumVale: "" },
  brands = "",
  color = "",
  subcategory = "",
  size = "",
  discount = { min: "", max: "", maximumVale: "" },
  material = "",
  sort = "",
  type = null,
  priceFilter
) => async dispatch => {

  try {
    dispatch({ type: LIST_PRODUCT_REQUEST });
    let url = `/api/products?keyword=&page=${pageNumber}&minprice=${price.min}&maxprice=${price.max}&rows=16&sort=${sort}`;
    if (
      cetegory != "" ||
      subcategory != "" ||
      color != "" ||
      brands != "" ||
      size != "" ||
      material != ""
    ) {
      console.log(url,"urlurlurlurl")
      if (cetegory != "") {
        cetegory = cetegory.toString();
        brands = brands.toString();
        // url = `/api/products?category=${cetegory}&page=${pageNumber}&minprice=${price.min}&maxprice=${maximumPrice}`;
        url = `/api/products?category=${cetegory}&page=${pageNumber}&brands=${brands}&color=${color}&subcategory=${subcategory}&size=${size}&mindiscount=${discount.min}&maxdiscount=${discount.max}&material=${material}&minprice=${price.min}&maxprice=${price.max}&rows=16&sort=${sort}`;
      } else {
        url = `/api/products?keyword=all&page=${pageNumber}&brands=${brands}&color=${color}&subcategory=${subcategory}&size=${size}&mindiscount=${discount.min}&maxdiscount=${discount.max}&material=${material}&minprice=${price.min}&maxprice=${price.max}&rows=16&sort=${sort}`;
      }
    } else {
      if (keyword != "") {
        url = `/api/products?keyword=${keyword}&page=${pageNumber}&brands=${brands}&color=${color}&subcategory=${subcategory}&size=${size}&mindiscount=${discount.min}&maxdiscount=${discount.max}&material=${material}&minprice=${price.min}&maxprice=${price.max}&rows=16&sort=${sort}`;
      }
    }
    const { data } = await axios.get(url);
    dispatch({
      type: LIST_PRODUCT_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: LIST_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const getWishList = userId => async dispatch => {
  try {
    dispatch({ type: WISH_LIST_REQUEST });
    const { data } = await axios.get(`/api/users/wish/${userId}`);
    dispatch({
      type: WISH_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: WISH_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const removeWish = (proId, userId) => async dispatch => {
  try {
    dispatch({ type: WISH_LIST_REQUEST });

    const { data } = await axios.delete(`/api/users/wish/${userId}/${proId}`);

    dispatch({
      type: WISH_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: WISH_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const listProduct = (
  keyword = "",
  pageNumber = ""
) => async dispatch => {
  try {
    dispatch({ type: SINGLE_PRODUCT_LIST_REQUEST });
    if (keyword == "compare") {
      const { data } = await axios.get(`/api/products/${localStorage.compare}`);
      dispatch({
        type: SINGLE_PRODUCT_LIST_SUCCESS,
        payload: data
      });
    } else {
      const { data } = await axios.get(
        `/api/products/slug?keyword=${keyword}&pageNumber=${pageNumber}`
      );
      dispatch({
        type: SINGLE_PRODUCT_LIST_SUCCESS,
        payload: data
      });
    }
  } catch (error) {
    dispatch({
      type: SINGLE_PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};
export const listProductDetails = slug => async dispatch => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/products/slug/${slug}`);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};
export const BrandProductList = brandId => async dispatch => {
  try {
    dispatch({ type: BRAND_PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/products/brand/${brandId}`);
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const listCarouselImages = id => async dispatch => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    // const { data } = await axios.get(`/api/banner/${id}`)
    const data = {
      _id: "1",
      title: "data",
      link: "/",
      desc: "fbddjf kbfvb vjhg  gv",
      short_desc: "bgjfbj",
      image: "/uploads/Banner4.jpg?text=Fourth slide&bg=20232a",
      index: "12"
    };
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const deleteProduct = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_DELETE_REQUEST
    });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    await axios.delete(`/api/products/${id}`, config);

    dispatch({
      type: PRODUCT_DELETE_SUCCESS
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    // if (message === "Not authorized, token failed") {
    //   dispatch(logout());
    // }
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: message
    });
  }
};

export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REQUEST
    });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.post(`/api/products`, {}, config);

    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    // if (message === "Not authorized, token failed") {
    //   dispatch(logout());
    // }
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload: message
    });
  }
};

export const updateProduct = product => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_UPDATE_REQUEST
    });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.put(
      `/api/products/${product._id}`,
      product,
      config
    );

    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
      payload: data
    });
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    // if (message === "Not authorized, token failed") {
    //   dispatch(logout());
    // }
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload: message
    });
  }
};

export const createProductReview = (productId, review) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REVIEW_REQUEST
    });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`
      }
    };
    var review_data = await axios.post(
      `/api/products/${productId}/reviews`,
      review,
      config
    );
    dispatch({
      type: PRODUCT_CREATE_REVIEW_SUCCESS,
      data: review_data
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    // if (message === "Not authorized, token failed") {
    //   dispatch(logout());
    // }
    dispatch({
      type: PRODUCT_CREATE_REVIEW_FAIL,
      payload: message
    });
  }
};

export const listTopProducts = () => async dispatch => {
  try {
    dispatch({ type: PRODUCT_TOP_REQUEST });

    const { data } = await axios.get(`/api/products/top`);

    dispatch({
      type: PRODUCT_TOP_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// export const listSaleProduct = () => async (dispatch) => {
//   try {
//     dispatch({ type: PRODUCT_SALE_REQUEST });
//     const { data } = await axios.get(`/api/products/sale`);
//     dispatch({
//       type: PRODUCT_SALE_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: PRODUCT_SALE_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };
