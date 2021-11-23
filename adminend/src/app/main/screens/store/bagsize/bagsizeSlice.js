import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';

export const getBagsize = createAsyncThunk('bagsize/getBagsize', async params => {
	const response = await axios.get(`/api/bagsize/${params.bagsizeId}`);
	const data = await response.data;

	return data === undefined ? null : data;
});

export const saveBagsize = createAsyncThunk('bagsize/saveBagsize', async bagsize => {
	let response;
	if (bagsize._id) {
		response = await axios.put(`/api/bagsize/${bagsize._id}`, bagsize);
	} else {
		response = await axios.post('/api/bagsize', bagsize);
	}
	const data = await response.data;

	return data;
});

const bagsizeSlice = createSlice({
	name: 'bagsize',
	initialState: null,
	reducers: {
		resetBagsize: () => null,
		newBagsize: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					title: '',
					minsize: '',
					maxsize: ''
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
