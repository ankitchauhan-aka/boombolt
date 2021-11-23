import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
	{
		id: 'dashboard',
		title: 'Dashboard',
		icon: 'dashboard',
		type: 'item',
		url: '/dashboard'
	},
	{
		id: 'category',
		title: 'Category',
		type: 'item',
		icon: 'category',
		url: '/admin/categories'
	},
	{
		id: 'homecategory',
		title: 'Home Category',
		type: 'item',
		icon: 'category',
		url: '/admin/homecategories'
	},
	{
		id: 'brand',
		title: 'Brand',
		type: 'item',
		url: '/admin/brands',
		icon: 'branding_watermark'
	},
	{
		id: 'hotdeals',
		title: 'Hot Deals',
		type: 'item',
		icon: 'local_offer',
		url: '/admin/hotdeals'
	},
	{
		id: 'banner',
		title: 'Banner',
		type: 'item',
		url: '/admin/banners',
		icon: 'view_carousel'
	},
	{
		id: 'video',
		title: 'Video',
		type: 'item',
		url: '/admin/videos',
		icon: 'featured_video'
	},
	{
		id: 'events',
		title: 'Events & Activities',
		type: 'item',
		url: '/admin/events',
		icon: 'event'
	},
	{
		id: 'user',
		title: 'Customer',
		type: 'item',
		url: '/admin/customers',
		icon: 'people_alt'
	},
	{
		id: 'specs',
		title: 'Specs',
		type: 'item',
		url: '/admin/specs',
		icon: 'loupe'
	},
	{
		id: 'product',
		title: 'Product',
		type: 'collapse',
		icon: 'add_business',
		children: [
			{
				id: 'product-list',
				title: 'All',
				type: 'item',
				url: '/admin/products',
				exact: true
			},
			{
				id: 'new-product',
				title: 'Add',
				type: 'item',
				url: '/admin/product/new',
				exact: true
			}
		]
	},

	{
		id: 'orders',
		title: 'Order',
		type: 'item',
		icon: 'dvr',
		url: '/admin/orders',
		exact: true
	},
	{
		id: 'coupons',
		title: 'Coupon',
		type: 'item',
		icon: 'local_offer',
		url: '/admin/coupons',
		exact: true
	},
	{
		id: 'state',
		title: 'State',
		type: 'item',
		url: '/admin/states',
		icon: 'branding_watermark'
	},
	{
		id: 'tax',
		title: 'Tax',
		type: 'item',
		url: '/admin/taxes',
		icon: 'dvr'
	},
	{
		id: 'subscribers',
		title: 'Subscriber',
		type: 'item',
		icon: 'subscriptions',
		url: '/admin/subscribers',
		exact: true
	},
	{
		id: 'color',
		title: 'Color',
		type: 'item',
		icon: 'color_lens',
		url: '/admin/colors',
		exact: true
	},
	{
		id: 'newdrop',
		title: 'New Drop',
		type: 'item',
		icon: 'local_offer',
		url: '/admin/newdrops',
		exact: true
	},
	{
		id: 'bagsize',
		title: 'Bag Size',
		type: 'item',
		url: '/admin/bagsizes',
		icon: 'dvr',
		exact: true
	},
	{
		id: 'material',
		title: 'Material',
		type: 'item',
		url: '/admin/materials',
		icon: 'dvr',
		exact: true
	}
];

export default navigationConfig;
