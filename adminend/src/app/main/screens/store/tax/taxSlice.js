import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getTax = createAsyncThunk('tax/getTax', async params => {
	const response = await axios.get(`/api/tax/${params.taxId}`);
	const data = await response.data;

	return data === undefined ? null : data;
});

export const saveTax = createAsyncThunk('tax/saveTax', async taxdata => {
	let response;
	const { tax, active, home_include } = taxdata;
	if (taxdata._id) {
		response = await axios.put(`/api/tax/${taxdata._id}`, {
			tax,
			home_include,
			active
		});
	} else {
		response = await axios.post('/api/tax', {
			tax,
			home_include,
			active
		});
	}
	const data = await response.data;

	return data;
});

const taxSlice = createSlice({
	name: 'tax',
	initialState: null,
	reducers: {
		resetTaxField: () => null,
		newTaxField: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					_id: '',
					tax: '',
					home_include: false,
					active: true
				}
			})
		}
	},
	extraReducers: {
		[getTax.fulfilled]: (state, action) => action.payload,
		[saveTax.fulfilled]: (state, action) => action.payload
	}
});

export const { newTaxField, resetTaxField } = taxSlice.actions;

export default taxSlice.reducer;
