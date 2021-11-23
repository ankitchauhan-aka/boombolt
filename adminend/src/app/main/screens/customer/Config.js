import React from 'react';

const CustomerConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/admin/customer/:userId',
			component: React.lazy(() => import('./Form'))
		},
		{
			path: '/admin/customers',
			component: React.lazy(() => import('./List'))
		}
	]
};

export default CustomerConfig;
