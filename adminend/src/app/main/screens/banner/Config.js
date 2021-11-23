import React from 'react';

const BannerConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/admin/banner/:bannerId',
			component: React.lazy(() => import('./Form'))
		},
		{
			path: '/admin/banners',
			component: React.lazy(() => import('./List'))
		}
	]
};

export default BannerConfig;
