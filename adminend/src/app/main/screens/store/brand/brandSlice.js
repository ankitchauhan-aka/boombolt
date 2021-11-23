import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';

export const getBrand = createAsyncThunk('brand/getBrand', async params => {
	const response = await axios.get(`/api/brand/${params.brandId}`);
	const data = await response.data;

	return data === undefined ? null : data;
});

export const saveBrand = createAsyncThunk('brand/saveBrand', async brand => {
	let response;
	const { title, slug, image, active, home_include} = brand;
	if (brand._id) {
		response = await axios.put(`/api/brand/${brand._id}`, { title, slug: slug.replace(' ', '-'), image, home_include, active });
	} else {
		response = await axios.post('/api/brand', { title, slug: slug.replace(' ', '-'), image, home_include, active });
	}
	const data = await response.data;

	return data;
});

const brandSlice = createSlice({
	name: 'brand',
	initialState: null,
	reducers: {
		resetBrand: () => null,
		newBrand: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					_id: '',
					title: '',
					slug: '',
					image: '',
					home_include: false,
					active: true
				}
			})
		}
	},
	extraReducers: {
		[getBrand.fulfilled]: (state, action) => action.payload,
		[saveBrand.fulfilled]: (state, action) => action.payload
	}
});

export const { newBrand, resetBrand } = brandSlice.actions;

export default brandSlice.reducer;
