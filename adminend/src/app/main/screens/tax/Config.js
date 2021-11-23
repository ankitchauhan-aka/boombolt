import React from 'react';

const TaxConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/admin/taxes/:taxId',
			component: React.lazy(() => import('./Form'))
		},
		{
			path: '/admin/taxes',
			component: React.lazy(() => import('./List'))
		}
	]
};

export default TaxConfig;
