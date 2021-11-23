import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

const setInterceptors = () => {
	const access_token = localStorage.getItem('userInfo');
	if(access_token) {
		axios.defaults.headers.common.Authorization = `Bearer ${JSON.parse(access_token).token}`;
	}
}
export const getColors = createAsyncThunk('color/getColors', async () => {
	const response = await axios.get('/api/color');
	const data = await response.data;
	
	return data;
});

const colorsAdapter = createEntityAdapter({});

export const { selectAll: selectColors, selectById: selectColorById } = colorsAdapter.getSelectors(
	state => state.app.colors
);

const colorsSlice = createSlice({
	name: 'colors',
	initialState: colorsAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setColorsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getColors.fulfilled]: colorsAdapter.setAll
	}
});

export const { setColorsSearchText } = colorsSlice.actions;

export default colorsSlice.reducer;
