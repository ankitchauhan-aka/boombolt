import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCategory = createAsyncThunk('category/getCategory', async params => {
	const response = await axios.get(`/api/category/${params.categoryId}`);
	const data = await response.data;

	return data === undefined ? null : data;
});

export const saveCategory = createAsyncThunk('category/saveCategory', async category => {
	let response;
	const {title, slug, parent, active, image, home_include, nav_include} = category;
	if(category._id) {
		response = await axios.put(`/api/category/${category._id}`, {title, image, home_include, slug: slug.replace(' ', '-'), parent, nav_include, active});
	} else {
		response = await axios.post('/api/category', {title, image, home_include, slug: slug.replace(' ', '-'), parent, nav_include, active});
	}
	const data = await response.data;

	return data;
});


const categorySlice = createSlice({
	name: 'category',
	initialState: null,
	reducers: {
		resetCategory: () => null,
		newCategory: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					_id: '',
					title: '',
					slug: '',
					parent: '',
					nav_include: false,
					active: true
				}
			})
		}
	},
	extraReducers: {
		[getCategory.fulfilled]: (state, action) => action.payload,
		[saveCategory.fulfilled]: (state, action) => action.payload
	}
});

export const { newCategory, resetCategory } = categorySlice.actions;

export default categorySlice.reducer;
