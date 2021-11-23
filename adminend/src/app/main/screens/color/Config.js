import React from 'react';

const ColorConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/admin/color/:colorId',
			component: React.lazy(() => import('./Form'))
		},
		{
			path: '/admin/colors',
			component: React.lazy(() => import('./List'))
		}
	]
};

export default ColorConfig;
