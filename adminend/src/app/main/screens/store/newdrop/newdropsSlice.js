import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getNewDrops = createAsyncThunk('banner/getBanners', async () => {
	const response = await axios.get('/api/newdrop');
	const data = await response.data;

	return data;
});

const bannersAdapter = createEntityAdapter({});

export const { selectAll: selectNewDrops, selectById: selectBannerById } = bannersAdapter.getSelectors(
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
		[getNewDrops.fulfilled]: bannersAdapter.setAll
	}
});

export const { setBannersSearchText } = bannersSlice.actions;

export default bannersSlice.reducer;
