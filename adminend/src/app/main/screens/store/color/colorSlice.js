import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';

export const getColor = createAsyncThunk('color/getColor', async params => {
	const response = await axios.get(`/api/color/${params.colorId}`);
	const data = await response.data;

	return data === undefined ? null : data;
});

export const saveColor = createAsyncThunk('color/saveColor', async color => {
	let response;
	if (color._id) {
		response = await axios.put(`/api/color/${color._id}`, color);
	} else {
		response = await axios.post('/api/color', color);
	}
	const data = await response.data;

	return data;
});

const colorSlice = createSlice({
	name: 'color',
	initialState: null,
	reducers: {
		resetColor: () => null,
		newColor: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					title: '',
					colorcode: ''
				}
			})
		}
	},
	extraReducers: {
		[getColor.fulfilled]: (state, action) => action.payload,
		[saveColor.fulfilled]: (state, action) => action.payload
	}
});

export const { newColor, resetColor } = colorSlice.actions;

export default colorSlice.reducer;
