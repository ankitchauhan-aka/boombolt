import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getHomeCategories = createAsyncThunk('homehomecategories/getHomeCategories', async () => {
	const response = await axios.get('/api/homecategory');
	const data = await response.data;
	return data;
});

const homecategoriesAdapter = createEntityAdapter({});

export const {
	selectAll: selectHomeCategories,
	selectById: selectHomeCategoryById
} = homecategoriesAdapter.getSelectors(state => state.app.homecategories);

const homecategoriesSlice = createSlice({
	name: 'homecategories',
	initialState: homecategoriesAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setHomeCategoriesSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getHomeCategories.fulfilled]: homecategoriesAdapter.setAll
	}
});

export const { setHomeCategoriesSearchText } = homecategoriesSlice.actions;

export default homecategoriesSlice.reducer;
