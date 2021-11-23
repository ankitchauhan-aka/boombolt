import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getState = createAsyncThunk('state/getState', async params => {
	const response = await axios.get(`/api/state/${params.stateId}`);
	const data = await response.data;

	return data === undefined ? null : data;
});

export const saveState = createAsyncThunk('state/saveState', async state => {
	let response;
	const { title, tax_region, zipCode, shipping_charge, active, state_rate } = state;
	if (state._id) {
		response = await axios.put(`/api/state/${state._id}`, {
			title,
			tax_region,
			zipCode,
			shipping_charge,
			state_rate,
			active
		});
	} else {
		response = await axios.post('/api/state', {
			title,
			tax_region,
			zipCode,
			shipping_charge,
			state_rate,
			active
		});
	}
	const data = await response.data;

	return data;
});

const stateSlice = createSlice({
	name: 'state',
	initialState: null,
	reducers: {
		resetStateField: () => null,
		newStateField: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					title: '',
					tax_region: '',
					zipCode: Number,
					shipping_charge: Number,
					state_rate: Number,
					active: true
				}
			})
		}
	},
	extraReducers: {
		[getState.fulfilled]: (state, action) => action.payload,
		[saveState.fulfilled]: (state, action) => action.payload
	}
});

export const { newStateField, resetStateField } = stateSlice.actions;

export default stateSlice.reducer;
