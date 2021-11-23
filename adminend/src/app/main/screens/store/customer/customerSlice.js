import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCustomer = createAsyncThunk('customer/getCustomer', async params => {
	const response = await axios.get(`/api/users/${params.userId}`);
	const data = await response?.data;

	return data === undefined ? null : data;
});

export const saveCustomer = createAsyncThunk('customer/saveCustomer', async customer => {
	let response;
	const {firstName, lastName,  email, phone, active } = customer;
	if (customer._id) {
		response = await axios.put(`/api/users/${customer._id}`, { firstName, lastName,  email, phone, active });
	} else {
		response = await axios.post('/api/users', {firstName, lastName,  email, phone, active });
	}
	const data = await response.data;
	return data;
});

const customerSlice = createSlice({
	name: 'customer',
	initialState: null,
	reducers: {
		resetCustomer: () => null,
		newCustomer: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					_id: '',
					addresses: [],
					billingaddresses: [],
					email: '',
					firstName: '',
					lastName: '',
					phone: '',
					whishlist: []
				}
			})
		}
	},
	extraReducers: {
		[getCustomer.fulfilled]: (state, action) => action.payload,
		[saveCustomer.fulfilled]: (state, action) => action.payload
	}
});
export const { newCustomer, resetCustomer } = customerSlice.actions;

export default customerSlice.reducer;
