import React from 'react';

const ProductConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/admin/product/:productId',
			component: React.lazy(() => import('./single/Product'))
		},
		{
			path: '/admin/products',
			component: React.lazy(() => import('./Products'))
		},
	]
};

export default ProductConfig;
