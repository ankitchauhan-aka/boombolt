import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getOrders = createAsyncThunk('orders/getOrders', async page => {
	var response;

	if (!page) {
		response = await axios.get('/api/orders?keyword=all&page=1&rows=10');
	} else if (page?.sort) {
		response = await axios.get(
			'/api/orders?keyword=' +
				page?.keyword +
				'&page=' +
				page?.page +
				'&rows=' +
				page?.rows +
				'&sort=' +
				page?.sort
		);
	} else {
		response = await axios.get(
			'/api/orders?keyword=' + page?.keyword + '&page=' + page?.page + '&rows=' + page?.rows
		);
		// response = await axios.get('/api/orders?keyword=all&page=1&rows=10');
	}
	const data = await response;

	return data;
});

export const removeOrders = createAsyncThunk('orders/removeOrders', async (orderIds, { dispatch, getState }) => {
	await axios.post('/api/remove-orders', { orderIds });

	return orderIds;
});

const ordersAdapter = createEntityAdapter({});

export const { selectAll: selectOrders } = ordersAdapter.getSelectors(state => state.app.orders);

const ordersSlice = createSlice({
	name: 'orders',
	initialState: ordersAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setOrdersSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getOrders.fulfilled]: ordersAdapter.setAll,
		[removeOrders.fulfilled]: (state, action) => ordersAdapter.removeMany(state, action.payload)
	}
});

export const { setOrdersSearchText } = ordersSlice.actions;

export default ordersSlice.reducer;
