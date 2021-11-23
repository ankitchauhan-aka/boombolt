import React from 'react';

const SpecsConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/admin/specs/:specsId',
			component: React.lazy(() => import('./Form'))
		},
		{
			path: '/admin/specs',
			component: React.lazy(() => import('./List'))
		}
	]
};

export default SpecsConfig;
