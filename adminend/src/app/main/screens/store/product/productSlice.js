import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import FuseUtils from '@fuse/utils';

export const getProduct = createAsyncThunk('product/getProduct', async params => {
	const response = await axios.get(`/api/products/${params.productId}`);
	const data = await response.data;

	return data === undefined ? null : data;
});

export const saveProduct = createAsyncThunk('product/saveProduct', async product => {
	const data = '';
	if (product._id) {
		const response = await axios.put(`/api/products/${product._id}`, product);
		data = await response.data;
	} else {
		const response = await axios.post('/api/products', product);
		data = await response.data;
	}
	return data;
});

const productSlice = createSlice({
	name: 'product',
	initialState: null,
	reducers: {
		resetProduct: () => null,
		newProduct: {
			reducer: (state, action) => action.payload,
			prepare: event => ({
				payload: {
					// _id: '',
					name: '',
					slug: '',
					images: [],
					brand: '60a3ba80b552595649d42edc',
					specs: '',
					waranty: '',
					return: '',
					related: [],
					bought_together: [],
					categories: [],
					colors: [],
					discount: 0,
					size: [],
					material: [],
					height: '',
					width: '',
					depth: '',
					weight: '',
					short_desc: '',
					description: '',
					price: 0,
					discount_price: 0,
					sku: '',
					modal: '',
					countInStock: 0,
					nav_include: false,
					active: true,
					attr_type: '',
					attrs: {},
					topDeals_include: false,
					featured_include: false,
					sale_include: false,
					newProduct_include: false
				}
			})
		}
	},
	extraReducers: {
		[getProduct.fulfilled]: (state, action) => action.payload,
		[saveProduct.fulfilled]: (state, action) => action.payload
	}
});

export const { newProduct, resetProduct } = productSlice.actions;

export default productSlice.reducer;
