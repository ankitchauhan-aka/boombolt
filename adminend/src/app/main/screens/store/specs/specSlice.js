import FuseUtils from '@fuse/utils';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getSpecs = createAsyncThunk('spec/getSpecs', async params => {
	const response = await axios.get(`/api/specs/${params.specsId}`);
	const data = await response.data;

	return data === undefined ? null : data;
});

export const saveSpecs = createAsyncThunk('spec/saveSpecs', async specs => {
	let response;
	// const { title, slug, image, active, home_include} = specs;
	if (specs._id) {
		response = await axios.put(`/api/specs/${specs._id}`, specs);
	} else {
		response = await axios.post('/api/specs', specs);
	}
	const data = await response.data;

	return data;
});

const specSlice = createSlice({
	name: 'spec',
	initialState: null,
	reducers: {
		resetSpecs: () => null,
		newSpecs: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					title: '',
					attrs: [{value: ''}]
				}
			})
		}
	},
	extraReducers: {
		[getSpecs.fulfilled]: (state, action) => action.payload,
		[saveSpecs.fulfilled]: (state, action) => action.payload
	}
});

export const { newSpecs, resetSpecs } = specSlice.actions;

export default specSlice.reducer;
