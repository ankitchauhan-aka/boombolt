import React from 'react';

const CategoryConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/admin/category/:categoryId',
			component: React.lazy(() => import('./Form'))
		},
		{
			path: '/admin/categories',
			component: React.lazy(() => import('./List'))
		}
	]
};

export default CategoryConfig;
