import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getEvent = createAsyncThunk('event/getEvent', async params => {
	const response = await axios.get(`/api/event/${params.eventId}`);
	const data = await response.data;

	return data === undefined ? null : data;
});

export const saveEvent = createAsyncThunk('event/saveEvent', async event => {
	let response;
	const {title, location, startfrom, endson, desc, image, active} = event;
	if(event._id) {
		response = await axios.put(`/api/event/${event._id}`, {title, location, startfrom, endson, desc, image, active});
	} else {
		response = await axios.post('/api/event', {title, location, startfrom, endson, desc, image, active});
	}
	const data = await response.data;

	return data;
});


const eventSlice = createSlice({
	name: 'event',
	initialState: null,
	reducers: {
		resetEvent: () => null,
		newEvent: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					_id: '',
					title: '',
                    location: '',
                    startfrom: '',
                    endson:'',
					desc: '',
					image: '',
					active:'',
					
				}
			})
		}
	},
	extraReducers: {
		[getEvent.fulfilled]: (state, action) => action.payload,
		[saveEvent.fulfilled]: (state, action) => action.payload
	}
});

export const { newEvent, resetEvent } = eventSlice.actions;

export default eventSlice.reducer;
