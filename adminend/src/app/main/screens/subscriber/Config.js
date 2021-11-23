import React from 'react';

const SubscriberConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/admin/subscribers',
			component: React.lazy(() => import('./List'))
		}
	]
};

export default SubscriberConfig;
