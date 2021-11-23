import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

const setInterceptors = () => {
	const access_token = localStorage.getItem('userInfo');
	if(access_token) {
		axios.defaults.headers.common.Authorization = `Bearer ${JSON.parse(access_token).token}`;
	}
}
export const getCoupons = createAsyncThunk('coupon/getCoupons', async () => {
	const response = await axios.get('/api/coupon');
	const data = await response.data;
	
	return data;
});

const couponsAdapter = createEntityAdapter({});

export const { selectAll: selectCoupons, selectById: selectCouponById } = couponsAdapter.getSelectors(
	state => state.app.coupons
);

const couponsSlice = createSlice({
	name: 'coupons',
	initialState: couponsAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setCouponsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getCoupons.fulfilled]: couponsAdapter.setAll
	}
});

export const { setCouponsSearchText } = couponsSlice.actions;

export default couponsSlice.reducer;
