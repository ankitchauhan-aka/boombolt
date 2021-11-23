import React from 'react';

const MaterialConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/admin/material/:bagsizeId',
			component: React.lazy(() => import('./Form'))
		},
		{
			path: '/admin/materials',
			component: React.lazy(() => import('./List'))
		}
	]
};

export default MaterialConfig;
