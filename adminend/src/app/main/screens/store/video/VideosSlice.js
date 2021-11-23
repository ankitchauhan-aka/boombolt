import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getVideos = createAsyncThunk('video/getVideos', async () => {
	const response = await axios.get('/api/video');
	const data = await response.data;
	
	return data;
});

const videosAdapter = createEntityAdapter({});

export const { selectAll: selectVideos, selectById: selectVideoById } = videosAdapter.getSelectors(
	state => state.app.videos
);

const videosSlice = createSlice({
	name: 'videos',
	initialState: videosAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setVideosSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getVideos.fulfilled]: videosAdapter.setAll
	}
});

export const { setVideosSearchText } = videosSlice.actions;

export default videosSlice.reducer;
