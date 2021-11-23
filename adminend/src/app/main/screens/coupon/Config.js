import React from 'react';

const CouponConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/admin/coupon/:couponId',
			component: React.lazy(() => import('./Form'))
		},
		{
			path: '/admin/coupons',
			component: React.lazy(() => import('./List'))
		}
	]
};

export default CouponConfig;
