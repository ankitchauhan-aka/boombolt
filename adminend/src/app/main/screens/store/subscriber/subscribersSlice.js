import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getSubscribers = createAsyncThunk('subscriber/getSubscribers', async () => {
	const response = await axios.get('/api/subscriber');
	const data = await response.data;
	
	return data;
});

const subscribersAdapter = createEntityAdapter({});

export const { selectAll: selectSubscribers, selectById: selectSubscriberById } = subscribersAdapter.getSelectors(
	state => state.app.subscribers
);

const subscribersSlice = createSlice({
	name: 'subscribers',
	initialState: subscribersAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setSubscribersSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getSubscribers.fulfilled]: subscribersAdapter.setAll
	}
});

export const { setSubscribersSearchText } = subscribersSlice.actions;

export default subscribersSlice.reducer;
