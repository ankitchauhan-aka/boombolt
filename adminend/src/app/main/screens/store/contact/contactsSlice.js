import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getContacts = createAsyncThunk('contacts/getContacts', async page => {
	var response;

	if (!page) {
		response = await axios.get('/api/contactus/contactall');
	} else {
		response = await axios.get(
			'/api/orders?keyword=' + page?.keyword + '&page=' + page?.page + '&rows=' + page?.rows
		);
		// resconst ordersAdapter = createEntityAdapter({});ponse = await axios.get('/api/orders?keyword=all&page=1&rows=10');
	}
	const data = await response;

	return data;
});

export const removeOrders = createAsyncThunk('orders/removeOrders', async (orderIds, { dispatch, getState }) => {
	await axios.post('/api/remove-orders', { orderIds });
	return orderIds;
});

const ordersAdapter = createEntityAdapter({});

export const { selectAll: selectContacts } = ordersAdapter.getSelectors(state => state.app.contacts);

const contactsSlice = createSlice({
	name: 'orders',
	initialState: ordersAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setContactsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getContacts.fulfilled]: ordersAdapter.setAll,
		[removeOrders.fulfilled]: (state, action) => ordersAdapter.removeMany(state, action.payload)
	}
});

export const { setContactsSearchText } = contactsSlice.actions;

export default contactsSlice.reducer;
