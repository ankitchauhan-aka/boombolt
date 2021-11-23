import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCustomers = createAsyncThunk('customer/getCustomers', async () => {
	const response = await axios.get('/api/users');
	const data = await response.data;
	
	return data;
});

const customersAdapter = createEntityAdapter({});

export const { selectAll: selectCustomers, selectById: selectCustomerById } = customersAdapter.getSelectors(
	state => state.app.customers
);

const customersSlice = createSlice({
	name: 'customers',
	initialState: customersAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setCustomersSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getCustomers.fulfilled]: customersAdapter.setAll
	}
});

export const { setCustomersSearchText } = customersSlice.actions;

export default customersSlice.reducer;
