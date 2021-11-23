import React from 'react';

const BagsizeConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/admin/bagsize/:bagsizeId',
			component: React.lazy(() => import('./Form'))
		},
		{
			path: '/admin/bagsizes',
			component: React.lazy(() => import('./List'))
		}
	]
};

export default BagsizeConfig;
