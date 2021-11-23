import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getHomeCategory = createAsyncThunk('homecategory/getHomeCategory', async params => {
	const response = await axios.get(`/api/homecategory/${params.homecategoryId}`);
	const data = await response.data;

	return data === undefined ? null : data;
});

export const saveHomeCategory = createAsyncThunk('homecategory/saveHomeCategory', async homecategory => {
	let response;
	const { categories, active, image } = homecategory;
	if (homecategory._id) {
		response = await axios.put(`/api/homecategory/${homecategory._id}`, {
			categories,
			image,
			active
		});
	} else {
		response = await axios.post('/api/homecategory', {
			categories,
			image,
			active
		});
	}
	const data = await response.data;

	return data;
});

const homecategorySlice = createSlice({
	name: 'homecategory',
	initialState: null,
	reducers: {
		resetHomeCategory: () => null,
		newHomeCategory: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					_id: '',
					categories: [],
					active: true
				}
			})
		}
	},
	extraReducers: {
		[getHomeCategory.fulfilled]: (state, action) => action.payload,
		[saveHomeCategory.fulfilled]: (state, action) => action.payload
	}
});

export const { newHomeCategory, resetHomeCategory } = homecategorySlice.actions;

export default homecategorySlice.reducer;
