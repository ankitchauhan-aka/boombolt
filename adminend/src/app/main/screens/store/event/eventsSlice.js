import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getEvents = createAsyncThunk('event/getEvents', async () => {
	const response = await axios.get('/api/event');
	const data = await response.data;
	
	return data;
});

const eventsAdapter = createEntityAdapter({});

export const { selectAll: selectEvents, selectById: selectEventById } = eventsAdapter.getSelectors(
	state => state.app.events
);

const eventsSlice = createSlice({
	name: 'events',
	initialState: eventsAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setEventsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getEvents.fulfilled]: eventsAdapter.setAll
	}
});

export const { setEventsSearchText } = eventsSlice.actions;

export default eventsSlice.reducer;
