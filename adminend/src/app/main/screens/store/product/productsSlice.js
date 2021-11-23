import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getProducts = createAsyncThunk('products/getProducts', async page => {
	var response;
	if (!page) {
		response = await axios.get('/api/products?keyword=all&page=1&rows=10');
	} else {
		response = await axios.get(
			'/api/products?keyword=' + page?.keyword + '&page=' + page?.page + '&rows=' + page?.rows
		);
	}
	const data = await response;
	return data;
});
// export const removeProducts = createAsyncThunk(
// 	'eCommerceApp/products/removeProducts',
// 	async (productIds, { dispatch, getState }) => {
// 		await axios.post('/api/e-commerce-app/remove-products', { productIds });
// 		return productIds;
// 	}
// );
export const deleteProducts = createAsyncThunk('products/removeProducts',
	async productId => {
		var response;
		response= await axios.delete(`/api/products/${productId}`);
		const data = await response;
		return data;
	}
	
);
const productsAdapter = createEntityAdapter({});

export const { selectAll: selectProducts, selectById: selectProductById } = productsAdapter.getSelectors(
	state => state.app.products
);

const productsSlice = createSlice({
	name: 'products',
	initialState: productsAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setProductsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getProducts.fulfilled]: productsAdapter.setAll,
		// [removeProducts.fulfilled]: (state, action) => productsAdapter.remove(state, action.payload),
	}
});

export const { setProductsSearchText } = productsSlice.actions;

export default productsSlice.reducer;
