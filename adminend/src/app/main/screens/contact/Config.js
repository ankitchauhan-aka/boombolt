import React from 'react';

const ContactConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		// {
		// 	path: '/admin/contacts/:ContactId',
		// 	component: React.lazy(() => import('./single/Contact'))
		// },
		{
			path: '/admin/contacts',
			component: React.lazy(() => import('./Contacts'))
		}
	]
};

export default ContactConfig;
