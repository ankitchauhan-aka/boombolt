import React from 'react';

const NewDropConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/admin/newdrop/:bannerId',
			component: React.lazy(() => import('./Form'))
		},
		{
			path: '/admin/newdrops',
			component: React.lazy(() => import('./List'))
		}
	]
};

export default NewDropConfig;
