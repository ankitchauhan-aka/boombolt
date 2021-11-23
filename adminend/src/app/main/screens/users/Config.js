import React from 'react';

const UserConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/admin/users/:userId',
			component: React.lazy(() => import('./single/User'))
		},
		{
			path: '/admin/users',
			component: React.lazy(() => import('./Users'))
		}
	]
};

export default UserConfig;
