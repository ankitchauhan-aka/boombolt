import React from 'react';

const ProjectDashboardAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/admin/dashboard',
			component: React.lazy(() => import('./Dashboard'))
		}
	]
};

export default ProjectDashboardAppConfig;
