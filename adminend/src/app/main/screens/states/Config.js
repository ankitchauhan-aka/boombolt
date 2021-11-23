import React from 'react';

const StateConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/admin/states/:stateId',
			component: React.lazy(() => import('./Form'))
		},
		{
			path: '/admin/states',
			component: React.lazy(() => import('./List'))
		}
	]
};

export default StateConfig;
