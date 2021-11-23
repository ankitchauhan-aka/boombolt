import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getBanners = createAsyncThunk('banner/getBanners', async () => {
	const response = await axios.get('/api/banner');
	const data = await response.data;
	
	return data;
});

const bannersAdapter = createEntityAdapter({});

export const { selectAll: selectBanners, selectById: selectBannerById } = bannersAdapter.getSelectors(
	state => state.app.banners
);

const bannersSlice = createSlice({
	name: 'banners',
	initialState: bannersAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setBannersSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getBanners.fulfilled]: bannersAdapter.setAll
	}
});

export const { setBannersSearchText } = bannersSlice.actions;

export default bannersSlice.reducer;
