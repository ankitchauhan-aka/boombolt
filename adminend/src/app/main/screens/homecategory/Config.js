import React from 'react';

const HomeCategoryConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/admin/homecategory/:homecategoryId',
			component: React.lazy(() => import('./Form'))
		},
		{
			path: '/admin/homecategories',
			component: React.lazy(() => import('./List'))
		}
	]
};

export default HomeCategoryConfig;
