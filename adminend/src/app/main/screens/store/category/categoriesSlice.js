import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCategories = createAsyncThunk('categories/getCategories', async () => {
	const response = await axios.get('/api/category');
	const data = await response.data;
	return data;
});

const categoriesAdapter = createEntityAdapter({});

export const { selectAll: selectCategories, selectById: selectCategoryById } = categoriesAdapter.getSelectors(
	state => state.app.categories
);

const categoriesSlice = createSlice({
	name: 'categories',
	initialState: categoriesAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setCategoriesSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getCategories.fulfilled]: categoriesAdapter.setAll
	}
});

export const { setCategoriesSearchText } = categoriesSlice.actions;

export default categoriesSlice.reducer;
