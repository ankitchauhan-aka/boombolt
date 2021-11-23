import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getBanner = createAsyncThunk('banner/getBanner', async params => {
	const response = await axios.get(`/api/banner/${params.bannerId}`);
	const data = await response.data;

	return data === undefined ? null : data;
});

export const saveBanner = createAsyncThunk('banner/saveBanner', async banner => {
	let response;
	const { title, link, desc, short_desc, image, index, active } = banner;
	if (banner._id) {
		response = await axios.put(`/api/banner/${banner._id}`, {
			title,
			link,
			desc,
			short_desc,
			image,
			index,
			active
		});
	} else {
		response = await axios.post('/api/banner', { title, link, desc, short_desc, image, index, active });
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
					link: '',
					desc: '',
					short_desc: '',
					image: '',
					index: '',
					active: true
				}
			})
		}
	},
	extraReducers: {
		[getBanner.fulfilled]: (state, action) => action.payload,
		[saveBanner.fulfilled]: (state, action) => action.payload
	}
});

export const { newBanner, resetBanner } = bannerSlice.actions;

export default bannerSlice.reducer;
