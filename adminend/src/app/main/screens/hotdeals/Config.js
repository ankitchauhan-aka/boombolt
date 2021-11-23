import React from 'react';

const HotDealConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/admin/hotdeal/:hotdealId',
			component: React.lazy(() => import('./Form'))
		},
		{
			path: '/admin/hotdeals',
			component: React.lazy(() => import('./List'))
		}
	]
};

export default HotDealConfig;
