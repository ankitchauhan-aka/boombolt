import React from 'react';

const EventConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/admin/event/:eventId',
			component: React.lazy(() => import('./Form'))
		},
		{
			path: '/admin/events',
			component: React.lazy(() => import('./List'))
		}
	]
};

export default EventConfig;
