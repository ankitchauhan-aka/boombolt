import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';

export const getBagsize = createAsyncThunk('bagsize/getBagsize', async params => {
	const response = await axios.get(`/api/material/${params.bagsizeId}`);
	const data = await response.data;

	return data === undefined ? null : data;
});

export const saveBagsize = createAsyncThunk('bagsize/saveBagsize', async material => {
	let response;
	if (material._id) {
		response = await axios.put(`/api/material/${material._id}`, material);
	} else {
		response = await axios.post('/api/material', material);
	}
	const data = await response.data;

	return data;
});

const bagsizeSlice = createSlice({
	name: 'material',
	initialState: null,
	reducers: {
		resetBagsize: () => null,
		newBagsize: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					title: ''
				}
			})
		}
	},
	extraReducers: {
		[getBagsize.fulfilled]: (state, action) => action.payload,
		[saveBagsize.fulfilled]: (state, action) => action.payload
	}
});

export const { newBagsize, resetBagsize } = bagsizeSlice.actions;

export default bagsizeSlice.reducer;
