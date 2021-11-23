import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getHotDeals = createAsyncThunk('homehotdeals/getHotDeals', async () => {
	const response = await axios.get('/api/hotdeal');
	const data = await response.data;
	return data;
});

const hotdealsAdapter = createEntityAdapter({});

export const {
	selectAll: selectHotDeals,
	selectById: selectHotDealById
} = hotdealsAdapter.getSelectors(state => state.app.hotdeals);

const hotdealsSlice = createSlice({
	name: 'hotdeals',
	initialState: hotdealsAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setHotDealsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getHotDeals.fulfilled]: hotdealsAdapter.setAll
	}
});

export const { setHotDealsSearchText } = hotdealsSlice.actions;

export default hotdealsSlice.reducer;
