import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

const setInterceptors = () => {
	const access_token = localStorage.getItem('userInfo');
	if(access_token) {
		axios.defaults.headers.common.Authorization = `Bearer ${JSON.parse(access_token).token}`;
	}
}
export const getBrands = createAsyncThunk('brand/getBrands', async () => {
	const response = await axios.get('/api/brand');
	const data = await response.data.finalBrands;
	
	return data;
});

const brandsAdapter = createEntityAdapter({});

export const { selectAll: selectBrands, selectById: selectBrandById } = brandsAdapter.getSelectors(
	state => state.app.brands
);

const brandsSlice = createSlice({
	name: 'brands',
	initialState: brandsAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setBrandsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getBrands.fulfilled]: brandsAdapter.setAll
	}
});

export const { setBrandsSearchText } = brandsSlice.actions;

export default brandsSlice.reducer;
