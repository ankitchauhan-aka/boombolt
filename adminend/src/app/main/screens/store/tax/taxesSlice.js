import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

const setInterceptors = () => {
	const access_token = localStorage.getItem('userInfo');
	if (access_token) {
		axios.defaults.headers.common.Authorization = `Bearer ${JSON.parse(access_token).token}`;
	}
};
export const getTaxes = createAsyncThunk('tax/getTaxs', async () => {
	const response = await axios.get('/api/tax');
	const data = await response.data;

	return data;
});

const taxesAdapter = createEntityAdapter({});

export const { selectAll: selectTaxes, selectById: selectTaxById } = taxesAdapter.getSelectors(
	state => state.app.taxes
);

const taxesSlice = createSlice({
	name: 'taxes',
	initialState: taxesAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setTaxesSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getTaxes.fulfilled]: taxesAdapter.setAll
	}
});

export const { setTaxesSearchText } = taxesSlice.actions;

export default taxesSlice.reducer;
