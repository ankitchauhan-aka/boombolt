import React from 'react';

const BrandConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/admin/brand/:brandId',
			component: React.lazy(() => import('./Form'))
		},
		{
			path: '/admin/brands',
			component: React.lazy(() => import('./List'))
		}
	]
};

export default BrandConfig;
