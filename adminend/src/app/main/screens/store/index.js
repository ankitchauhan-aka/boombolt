import { combineReducers } from '@reduxjs/toolkit';
import order from './order/orderSlice';
import orders from './order/ordersSlice';
import product from './product/productSlice';
import products from './product/productsSlice';
import brand from './brand/brandSlice';
import brands from './brand/brandsSlice';
import spec from './specs/specSlice';
import specs from './specs/specsSlice';
import coupon from './coupon/couponSlice';
import coupons from './coupon/couponsSlice';
import category from './category/categorySlice';
import categories from './category/categoriesSlice';
import hotdeal from './hotdeals/hotdealSlice';
import hotdeals from './hotdeals/hotdealsSlice';
import homecategory from './homecategory/homecategorySlice';
import homecategories from './homecategory/homecategoriesSlice';
import customer from './customer/customerSlice';
import customers from './customer/customersSlice';
import banner from './banner/bannerSlice';
import banners from './banner/bannersSlice';
import subscribers from './subscriber/subscribersSlice';
import state from './state/stateSlice';
import states from './state/statesSlice';
import tax from './tax/taxSlice';
import taxes from './tax/taxesSlice';
import video from './video/videoSlice';
import videos from './video/VideosSlice';
import event from './event/eventSlice';
import events from './event/eventsSlice';

import color from './color/colorSlice';
import colors from './color/colorsSlice';
import bagsize from './bagsize/bagsizeSlice';
import bagsizes from './bagsize/bagsizesSlice';
import material from './material/materialSlice';
import materials from './material/materialsSlice';
const reducer = combineReducers({
	products,
	product,
	orders,
	order,
	brand,
	brands,
	spec,
	specs,
	coupon,
	coupons,
	customer,
	customers,
	category,
	categories,
	homecategory,
	homecategories,
	banner,
	banners,
	subscribers,
	state,
	states,
	tax,
	taxes,
	video,
	videos,
	color,
	colors,
	bagsize,
	bagsizes,
	material,
	materials,
	hotdeal,
	hotdeals,
	event,
	events
});

export default reducer;
