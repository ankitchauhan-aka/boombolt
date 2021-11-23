import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getVideo = createAsyncThunk('video/getVideo', async params => {
	const response = await axios.get(`/api/video/${params.videoId}`);
	const data = await response.data;

	return data === undefined ? null : data;
});

export const saveVideo = createAsyncThunk('video/saveVideo', async video => {
	let response;
	const {title, link, desc, short_desc, mp4file, image,index, active} = video;
	if(video._id) {
		response = await axios.put(`/api/video/${video._id}`, {title, link, desc, short_desc, mp4file, image,index, active});
	} else {
		response = await axios.post('/api/video', {title, link, desc, short_desc, mp4file,image, index, active});
	}
	const data = await response.data;
	return data;
});

const videoSlice = createSlice({
	name: 'video',
	initialState: null,
	reducers: {
		resetVideo: () => null,
		newVideo: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					_id: '',
					title: '',
					link: '',
					desc: '',
					short_desc: '',
					mp4file: '',
					image:'',
					index: '',
					active: true
				}
			})
		}
	},
	extraReducers: {
		[getVideo.fulfilled]: (state, action) => action.payload,
		[saveVideo.fulfilled]: (state, action) => action.payload
	}
});

export const { newVideo, resetVideo } = videoSlice.actions;

export default videoSlice.reducer;
