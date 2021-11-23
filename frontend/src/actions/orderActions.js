import axios from "axios";
import { CART_CLEAR_ITEMS } from "../constants/cartConstants";
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_PAY_FAIL,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_REQUEST,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_FAIL,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_REQUEST,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_REQUEST,
  ORDER_CANCEL_FAIL,
  ORDER_CANCEL_SUCCESS,
  ORDER_CANCEL_REQUEST,
  ORDER_CANCEL_RESET,
  ORDER_RETURN_REQUEST,
  ORDER_RETURN_SUCCESS,
  ORDER_RETURN_FAIL
} from "../constants/orderConstants";
import { logout } from "./userActions";

export const createOrder = order => async (dispatch, getState) => {
  console.log(order, "order...//");
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST
    });
    const {
      userLogin: { userInfo }
    } = getState();
    var orderResponse = "";
    if (userInfo) {
      let config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`
        }
      };
      orderResponse = await axios.post(`/api/orders`, order, config);
    } else {
      orderResponse = await axios.post(`/api/orders/order/book`, order);
    }
    if (orderResponse.data.BOOMBOLTOrderId) {
      let shipmentLoginResponse;
      let shipmentLoginToken;
      let shipmentData;
      let config = {
        method: "post",
        url: "https://apiv2.shiprocket.in/v1/external/auth/login",
        headers: {
          "Content-Type": "application/json"
        },
        data: JSON.stringify({
          email: "sshivendra6387@gmail.com",
          password: "sshivendra6387"
        })
      };

      await axios(config)
        .then(function(response) {
          shipmentLoginResponse = response.data;
          shipmentLoginToken = response.data.token;
        })
        .catch(function(error) {
          console.log(error, "shipmentlogin");
        });
      let shipOrderId = "";
      let characters = "0123456789";
      let charactersLength = characters.length;
      for (let i = 0; i < 10; i++) {
        shipOrderId += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      let data = JSON.stringify({
        order_id: shipOrderId,
        order_date: orderResponse.data.createdAt,
        pickup_location: "Primary",
        channel_id: "570575",
        comment: "Reseller: Boombolt",
        billing_customer_name: order.billingAddress.firstname,
        billing_last_name: order.billingAddress.lastname,
        billing_address: order.billingAddress.streetaddress.toString(),
        billing_address_2: order.billingAddress.streetaddress.toString(),
        billing_city: order.billingAddress.city,
        billing_pincode: order.billingAddress.postalCode,
        billing_state: order.billingAddress.state,
        billing_country: order.billingAddress.country,
        billing_email: order.billingAddress.email,
        billing_phone: order.billingAddress.phone,
        shipping_is_billing: true,
        shipping_customer_name: "",
        shipping_last_name: "",
        shipping_address: "",
        shipping_address_2: "",
        shipping_city: "",
        shipping_pincode: "",
        shipping_country: "",
        shipping_state: "",
        shipping_email: "",
        shipping_phone: "",
        order_items: order.orderItems,
        payment_method: order.paymentMethod,
        shipping_charges: order.shippingPrice,
        giftwrap_charges: 0,
        transaction_charges: 0,
        total_discount: 0,
        sub_total: order.totalPrice,
        length: order.length ? order.length : 10,
        breadth: order.breadth ? order.breadth : 15,
        height: order.height ? order.height : 20,
        weight: order.weight ? order.weight : 0.1
      });
      config = {
        method: "post",
        url:
          "https://apiv2.shiprocket.in/v1/external/shipments/create/forward-shipment",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${shipmentLoginToken}`
        },
        data: data
      };
      await axios(config)
        .then(function(response) {
          shipmentData = {
            order_id: response.data.payload.order_id,
            shipment_id: response.data.payload.shipment_id,
            awb_code: response.data.payload.awb_code,
            courier_name: response.data.payload.courier_name,
            label_url: response.data.payload.label_url,
            manifest_url: response.data.payload.manifest_url,
            pickup_scheduled_date: response.data.payload.pickup_scheduled_date,
            pickup_token_number: response.data.payload.pickup_token_number,
            routing_code: response.data.payload.routing_code
          };
        })
        .catch(function(error) {
          console.log(error, "createShipmentError");
        });
      config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`
        }
      };
      orderResponse = await axios.put(
        `/api/orders/${orderResponse.data._id}/shipment`,
        shipmentData,
        config
      );
    }
    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: orderResponse
    });
    dispatch({
      type: CART_CLEAR_ITEMS,
      payload: orderResponse
    });
    localStorage.removeItem("cartItems");
    localStorage.removeItem("payable_amount");
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: message
    });
  }
};

export const getOrderDetails = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST
    });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(`/api/orders/${id}`, config);

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: message
    });
  }
};

export const payOrder = (orderId, paymentResult) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: ORDER_PAY_REQUEST
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
      `/api/orders/${orderId}/pay`,
      paymentResult,
      config
    );

    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_PAY_FAIL,
      payload: message
    });
  }
};

export const orderPayment = (orderId, amount) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_PAY_REQUEST
    });

    const {
      userLogin: { userInfo }
    } = getState();
    amount = amount * 100;
    const data = await axios.post("/api/orders/addPayment/payment", {
      orderId,
      amount
    });

    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_PAY_FAIL,
      payload: message
    });
  }
};

export const deliverOrder = order => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DELIVER_REQUEST
    });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.put(
      `/api/orders/${order._id}/deliver`,
      {},
      config
    );

    dispatch({
      type: ORDER_DELIVER_SUCCESS,
      payload: data
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_DELIVER_FAIL,
      payload: message
    });
  }
};

export const cancelOrder = (order, cancelReason) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: ORDER_CANCEL_REQUEST
    });

    const {
      userLogin: { userInfo }
    } = getState();

    let config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.put(
      `/api/orders/${order._id}/cancel`,
      cancelReason,
      config
    );
    let shipmentLoginToken;
    config = {
      method: "post",
      url: "https://apiv2.shiprocket.in/v1/external/auth/login",
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify({
        email: "sshivendra6387@gmail.com",
        password: "sshivendra6387"
      })
    };

    await axios(config)
      .then(function(response) {
        shipmentLoginToken = response.data.token;
      })
      .catch(function(error) {
        console.log(error, "shipmentlogin");
      });
    let dataId = JSON.stringify({
      ids: [order.order_id]
    });

    config = {
      method: "post",
      url: "https://apiv2.shiprocket.in/v1/external/orders/cancel",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${shipmentLoginToken}`
      },
      data: dataId
    };
    axios(config)
      .then(function(response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function(error) {
        console.log(error);
      });
    dispatch(listMyOrders());
    dispatch({
      type: ORDER_CANCEL_SUCCESS,
      payload: data
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_CANCEL_FAIL,
      payload: message
    });
  }
};

export const returnOrder = (order, returnReason) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: ORDER_RETURN_REQUEST
    });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.put(
      `/api/orders/${order._id}/return`,
      returnReason,
      config
    );
    dispatch(listMyOrders());
    dispatch({
      type: ORDER_RETURN_SUCCESS,
      payload: data
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_RETURN_FAIL,
      payload: message
    });
  }
};

export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_MY_REQUEST
    });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(`/api/orders/myorders`, config);
    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
      payload: data
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload: message
    });
  }
};

export const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_REQUEST
    });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(`/api/orders`, config);

    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_LIST_FAIL,
      payload: message
    });
  }
};
