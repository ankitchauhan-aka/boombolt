import React from 'react';
import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import CategoryConfig from 'app/main/screens/category/Config';
import HomeCategoryConfig from 'app/main/screens/homecategory/Config';
import DashboardConfig from 'app/main/screens/dashboard/DashboardConfig';
import BrandConfig from 'app/main/screens/brand/Config';
import CustomerConfig from 'app/main/screens/customer/Config';
import BannerConfig from 'app/main/screens/banner/Config';
import SubscriberConfig from 'app/main/screens/subscriber/Config';
import LoginConfig from 'app/main/screens/login/Config';
import CouponConfig from 'app/main/screens/coupon/Config';
import OrderConfig from 'app/main/screens/order/Config';
import ProductConfig from 'app/main/screens/product/Config';
import StateConfig from 'app/main/screens/states/Config';
import TaxConfig from 'app/main/screens/tax/Config';
import SpecsConfig from 'app/main/screens/specs/Config';
import VideoConfig from 'app/main/screens/video/Config';
import ColorConfig from 'app/main/screens/color/Config';
import BagsizeConfig from 'app/main/screens/bagsize/Config';
import HotDealConfig from 'app/main/screens/hotdeals/Config';
import EventConfig from 'app/main/screens/events/Config';
import NewDropConfig from 'app/main/screens/newdrop/Config';
import MaterialConfig from 'app/main/screens/material/Config';

const routeConfigs = [
	DashboardConfig,
	CategoryConfig,
	HomeCategoryConfig,
	BrandConfig,
	CustomerConfig,
	LoginConfig,
	BannerConfig,
	CouponConfig,
	ColorConfig,
	ProductConfig,
	OrderConfig,
	StateConfig,
	TaxConfig,
	SubscriberConfig,
	SpecsConfig,
	BagsizeConfig,
	HotDealConfig,
	VideoConfig,
	BagsizeConfig,
	EventConfig,
	NewDropConfig,
	MaterialConfig
];
const routeConfigLogin = [LoginConfig];
const getAccessToken = () => {
	return window.localStorage.getItem('jwt_access_token');
};
var routes;
if (getAccessToken() != null) {
	routes = [
		...FuseUtils.generateRoutesFromConfigs(routeConfigs),
		{
			path: '/',
			component: () => <Redirect to="/admin/dashboard" />
		}
	];
} else {
	routes = [
		...FuseUtils.generateRoutesFromConfigs(routeConfigLogin),
		{
			path: '/',
			component: () => <Redirect to="/admin/login" />
		}
	];
}

export default routes;
