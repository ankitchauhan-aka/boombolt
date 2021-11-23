import React from 'react';

const VideoConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/admin/video/:videoId',
			component: React.lazy(() => import('./Form'))
		},
		{
			path: '/admin/videos',
			component: React.lazy(() => import('./List'))
		}
	]
};

export default VideoConfig;