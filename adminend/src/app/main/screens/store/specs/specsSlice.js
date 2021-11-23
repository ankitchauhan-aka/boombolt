import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

const setInterceptors = () => {
	const access_token = localStorage.getItem('userInfo');
	if(access_token) {
		axios.defaults.headers.common.Authorization = `Bearer ${JSON.parse(access_token).token}`;
	}
}
export const getSpecs = createAsyncThunk('specs/getSpecs', async () => {
	const response = await axios.get('/api/specs');
	const data = await response.data;
	
	return data;
});

const specsAdapter = createEntityAdapter({});

export const { selectAll: selectSpecs, selectById: selectSpecsById } = specsAdapter.getSelectors(
	state => state.app.specs
);

const specsSlice = createSlice({
	name: 'specs',
	initialState: specsAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setSpecsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getSpecs.fulfilled]: specsAdapter.setAll
	}
});

export const { setSpecsSearchText } = specsSlice.actions;

export default specsSlice.reducer;
