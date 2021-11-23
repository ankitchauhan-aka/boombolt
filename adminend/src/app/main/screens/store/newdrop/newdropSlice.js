import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getNewDrop = createAsyncThunk('banner/getBanner', async params => {
	const response = await axios.get(`/api/newdrop/${params.bannerId}`);
	const data = await response.data;

	return data === undefined ? null : data;
});

export const saveNewDrop = createAsyncThunk('banner/saveBanner', async banner => {
	let response;
	// return;
	const { title, categories, backimage, logo } = banner;
	if (banner._id) {
		response = await axios.put(`/api/newdrop/${banner._id}`, {
			title,
			categories,
			backimage,
			logo
		});
	} else {
		response = await axios.post('/api/newdrop', { title, categories, backimage, logo });
	}
	const data = await response.data;

	return data;
});

const bannerSlice = createSlice({
	name: 'banner',
	initialState: null,
	reducers: {
		resetBanner: () => null,
		newBanner: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					_id: '',
					title: '',
					backimage: '',
					logo: '',
					Category: []
				}
			})
		}
	},
	extraReducers: {
		[getNewDrop.fulfilled]: (state, action) => action.payload,
		[saveNewDrop.fulfilled]: (state, action) => action.payload
	}
});

export const { newBanner, resetBanner } = bannerSlice.actions;

export default bannerSlice.reducer;
