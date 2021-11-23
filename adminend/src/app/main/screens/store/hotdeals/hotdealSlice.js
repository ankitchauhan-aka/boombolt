import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getHotDeal = createAsyncThunk('hotdeal/getHotDeal', async params => {
	const response = await axios.get(`/api/hotdeal/${params.hotdealId}`);
	const data = await response.data;
	return data === undefined ? null : data;
});

export const saveHotDeal = createAsyncThunk('hotdeal/saveHotDeal', async hotdeal => {
	let response;
	const { fromdate, todate, categories, active, image } = hotdeal;
	if (hotdeal._id) {
		response = await axios.put(`/api/hotdeal/${hotdeal._id}`, {
			fromdate,
			todate,
			categories,
			image,
			active
		});
	} else {
		response = await axios.post('/api/hotdeal', {
			fromdate,
			todate,
			categories,
			image,
			active
		});
	}
	const data = await response.data;

	return data;
});

const hotdealSlice = createSlice({
	name: 'hotdeal',
	initialState: null,
	reducers: {
		resetHotDeal: () => null,
		newHotDeal: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					_id: '',
					fromdate: '',
					todate: '',
					categories: [],
					active: true
				}
			})
		}
	},
	extraReducers: {
		[getHotDeal.fulfilled]: (state, action) => action.payload,
		[saveHotDeal.fulfilled]: (state, action) => action.payload
	}
});

export const { newHotDeal, resetHotDeal } = hotdealSlice.actions;

export default hotdealSlice.reducer;
