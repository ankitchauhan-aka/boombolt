import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  TOP_NAV_REQUEST,
  TOP_NAV_REQUEST_SUCCESS,
  TOP_NAV_REQUEST_FAIL,
  GET_CATEGARY_REQUEST,
  GET_CATEGARY_REQUEST_SUCCESS,
  GET_CATEGARY_REQUEST_FAIL,
  GET_BAGSIZE_REQUEST,
  GET_BAGSIZE_REQUEST_SUCCESS,
  GET_BAGSIZE_REQUEST_FAIL,
  GET_MATERIAL_REQUEST,
  GET_MATERIAL_REQUEST_SUCCESS,
  GET_MATERIAL_REQUEST_FAIL,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_LOGIN_REQUEST,
  BILLING_ADDRESS_MODIFCATION_REQUEST,
  BILLING_ADDRESS_MODIFCATION_SUCCESS,
  BILLING_ADDRESS_MODIFCATION_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_LOGOUT_FAIL,
  SINGLE_USER_DETAIL_REQUEST,
  SINGLE_USER_DETAIL_SUCCESS,
  SINGLE_USER_DETAIL_FAIL,
  SINGLE_USER_DETAIL_RESET,
  USERS_DETAIL_REQUEST,
  USERS_DETAIL_SUCCESS,
  USERS_DETAIL_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_REQUEST,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,
  VERIFY_USER_REQUEST,
  VERIFY_USER_SUCCESS,
  VERIFY_USER_FAIL,
  USER_FILE_REQUEST,
  USER_FILE_SUCCESS,
  USER_FILE_FAIL,
  GET_COLOR_REQUEST,
  GET_COLOR_REQUEST_SUCCESS,
  GET_COLOR_REQUEST_FAIL,
  GET_NEWDROP_REQUEST,
  GET_NEWDROP_REQUEST_SUCCESS,
  GET_NEWDROP_REQUEST_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_PAY_FAIL,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_REQUEST,
  ORDER_CREATE_RESET,
  ORDER_PAY_RESET,
  GET_MYWOLFPACK_ORDER_REQUEST,
  GET_MYWOLFPACK_ORDER_SUCCESS,
  GET_MYWOLFPACK_ORDER_FAIL,
  GET_MYWOLFPACK_ORDER_RESET,
  USER_FORGOT_PASSWORD_REQUEST,
  USER_FORGOT_PASSWORD_SUCCESS,
  USER_FORGOT_PASSWORD_FAIL,
  USER_FORGOT_PASSWORD_RESET,
  UPDATE_FORGET_PASSWORD_REQUEST,
  UPDATE_FORGET_PASSWORD_SUCCESS,
  UPDATE_FORGET_PASSWORD_FAIL,
  UPDATE_FORGET_PASSWORD_RESET
} from "../constants/userConstants";

export const resetPasswordReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST:
      return { loading: true };
    case RESET_PASSWORD_SUCCESS:
      return { loading: false, data: action.payload };
    case RESET_PASSWORD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const layoutReducer = (state = { navItems: [] }, action) => {
  switch (action.type) {
    case TOP_NAV_REQUEST:
      return { loading: true, navItems: [] };
    case TOP_NAV_REQUEST_SUCCESS:
      return { loading: false, navItems: action.payload };
    case TOP_NAV_REQUEST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const categoryReducer = (state = { navItems: [] }, action) => {
  switch (action.type) {
    case GET_CATEGARY_REQUEST:
      return { loading: true, navItems: [] };
    case GET_CATEGARY_REQUEST_SUCCESS:
      return { loading: false, data: action.payload };
    case GET_CATEGARY_REQUEST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const bagsizeReducer = (state = { data: [] }, action) => {
  switch (action.type) {
    case GET_BAGSIZE_REQUEST:
      return { loading: true, data: [] };
    case GET_BAGSIZE_REQUEST_SUCCESS:
      return { loading: false, data: action.payload };
    case GET_BAGSIZE_REQUEST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const materialReducer = (state = { data: [] }, action) => {
  switch (action.type) {
    case GET_MATERIAL_REQUEST:
      return { loading: true, data: [] };
    case GET_MATERIAL_REQUEST_SUCCESS:
      return { loading: false, data: action.payload };
    case GET_MATERIAL_REQUEST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const emailVerifyReducer = (state = {}, action) => {
  switch (action.type) {
    case VERIFY_USER_REQUEST:
      return { loading: true };
    case VERIFY_USER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case VERIFY_USER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
// login Reducers.........

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const userLogoutReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGOUT:
      return { loading: false, userInfo: action.payload };
      
      case USER_LOGOUT_FAIL:
        return { loading: false, error: action.payload };
    default:
      return state;
  }
}

//All users listing Reducer..//

export const usersDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USERS_DETAIL_REQUEST:
      return { loading: true };
    case USERS_DETAIL_SUCCESS:
      return { loading: false, user: action.payload };
    case USERS_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
// single user listing...//

export const singleUserDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case SINGLE_USER_DETAIL_REQUEST:
      return { ...state, loading: true };
    case SINGLE_USER_DETAIL_SUCCESS:
      return { loading: false, user: action.payload };
    case SINGLE_USER_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    case SINGLE_USER_DETAIL_RESET:
      return { user: {} };
    default:
      return state;
  }
};
// updating user.........

export const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
// all category....
export const categoryDetailsReducer = (state = { category: {} }, action) => {
  switch (action.type) {
    case CATEGORY_LIST_REQUEST:
      return { ...state, loading: true };
    case CATEGORY_LIST_SUCCESS:
      return { loading: false, category: action.payload };
    case CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true, error: false };
    case USER_UPDATE_PROFILE_SUCCESS:
      return {
        loading: false,
        success: true,
        error: false,
        userInfo: action.payload
      };
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};
export const removeBillingAddressReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case BILLING_ADDRESS_MODIFCATION_REQUEST:
      return { loading: true };
    case BILLING_ADDRESS_MODIFCATION_SUCCESS:
      return { loading: false, billindata: action.payload };
    case BILLING_ADDRESS_MODIFCATION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const colorReducer = (state = { data: [] }, action) => {
  switch (action.type) {
    case GET_COLOR_REQUEST:
      return { loading: true, data: [] };
    case GET_COLOR_REQUEST_SUCCESS:
      return { loading: false, data: action.payload };
    case GET_COLOR_REQUEST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const newdropReducer = (state = { data: [] }, action) => {
  // console.log(
  //   action,
  //   " hhjkjhjk hhgjh gj mgfgvrd g,mnbfdkfbds fmndbfkvgdfs kjs"
  // );
  switch (action.type) {
    case GET_NEWDROP_REQUEST:
      return { loading: true, data: [] };
    case GET_NEWDROP_REQUEST_SUCCESS:
      return { loading: false, data: action.payload };
    case GET_NEWDROP_REQUEST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const orderCreateWolfpackReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        loading: true
      };
    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload
      };
    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    case ORDER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const orderPayWolfpackReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return {
        loading: true
      };
    case ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
        data: action.payload
      };
    case ORDER_PAY_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    case ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};
export const wolfpackOrderListMyReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case GET_MYWOLFPACK_ORDER_REQUEST:
      return {
        loading: true
      };
    case GET_MYWOLFPACK_ORDER_SUCCESS:
      return {
        loading: false,
        orders: action.payload
      };
    case GET_MYWOLFPACK_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload
      };
    case GET_MYWOLFPACK_ORDER_RESET:
      return { orders: [] };
    default:
      return state;
  }
};
export const forgotPasswordReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_FORGOT_PASSWORD_REQUEST:
      return { loading: true };
    case USER_FORGOT_PASSWORD_SUCCESS:
      return { loading: false, data: action.payload };
    case USER_FORGOT_PASSWORD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateForgetPasswordReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case UPDATE_FORGET_PASSWORD_REQUEST:
      return { loading: true };
    case UPDATE_FORGET_PASSWORD_SUCCESS:
      return { loading: false, data: action.payload };
    case UPDATE_FORGET_PASSWORD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


