import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

const setInterceptors = () => {
	const access_token = localStorage.getItem('userInfo');
	if (access_token) {
		axios.defaults.headers.common.Authorization = `Bearer ${JSON.parse(access_token).token}`;
	}
};
export const getMaterials = createAsyncThunk('material/getMaterials', async () => {
	const response = await axios.get('/api/material');
	const data = await response.data;

	return data;
});

const bagsizesAdapter = createEntityAdapter({});

export const { selectAll: selectMaterials, selectById: selectMaterialById } = bagsizesAdapter.getSelectors(
	state => state.app.materials
);

const bagsizesSlice = createSlice({
	name: 'materials',
	initialState: bagsizesAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setBagsizesSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getMaterials.fulfilled]: bagsizesAdapter.setAll
	}
});

export const { setMaterialsSearchText } = bagsizesSlice.actions;

export default bagsizesSlice.reducer;
