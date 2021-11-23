import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import Icon from '@material-ui/core/Icon';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import _ from '@lodash';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import reducer from './store';
import { getCategories } from '../store/category/categoriesSlice';
import { getOrders } from '../store/order/ordersSlice';
import { getBrands } from '../store/brand/brandsSlice';
import FuseLoading from '@fuse/core/FuseLoading';
import { getProducts } from '../store/product/productsSlice';
import { getCustomers } from '../store/customer/customersSlice';

const useStyles = makeStyles(theme => ({
	content: {
		'& canvas': {
			maxHeight: '100%'
		}
	},
	selectedProject: {
		background: lighten(theme.palette.primary.dark, 0.1),
		color: theme.palette.primary.contrastText,
		borderRadius: '8px 0 0 0'
	},
	projectMenuButton: {
		background: lighten(theme.palette.primary.dark, 0.1),
		color: theme.palette.primary.contrastText,
		borderRadius: '0 8px 0 0',
		marginLeft: 1
	}
}));

function ProjectDashboardApp(props) {
	const dispatch = useDispatch();
	const classes = useStyles();
	const [category, setCategory] = useState([]);
	const [brands, setBrands] = useState([]);
	const [product, setProduct] = useState([]);
	const [customer, setCustomer] = useState([]);
	const [order, setOrder] = useState([]);

	// const [categoryloading, setcategoryLoading] = useState(true);
	// const [brandloading, setbrandsLoading] = useState(true);
	// const [customerloading, setcustomerLoading] = useState(true);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		dispatch(getCategories()).then(data => {
			setCategory(data);
		});
		dispatch(getBrands()).then(data => {
			setBrands(data);
		});
		dispatch(getCustomers()).then(data => {
			setCustomer(data);
		});
		dispatch(getOrders()).then(data => {
			setOrder(data);
		});
		dispatch(getProducts()).then(data => {
			setProduct(data);
			setLoading(false);
		});
	}, [dispatch]);

	if (loading) {
		return <FuseLoading />;
	}

	return (
		<FusePageSimple
			classes={{
				header: 'min-h-80 h-80',
				toolbar: 'min-h-56 h-56 items-end',
				content: classes.content
			}}
			content={
				<div className="p-12">
					{!loading && (
						<FuseAnimateGroup
							className="flex flex-wrap"
							enter={{
								animation: 'transition.slideUpBigIn'
							}}
						>
							<Card className="widget mx-8 my-8 flex w-full sm:w-1/2 md:w-1/4 p-12">
								<h1>Products</h1>
								<span>
									<h1 className="text-40">{product && product.payload && product.payload.length}</h1>
									<Icon className="text-green text-60">add_business</Icon>
								</span>
							</Card>

							<Card className="widget mx-8 my-8 flex w-full sm:w-1/2 md:w-1/4 p-12">
								<h1>Brands </h1>
								<span>
									<h1 className="text-40">{brands && brands.payload && brands.payload.length}</h1>
									<Icon className="text-red text-60">branding_watermark</Icon>
								</span>
							</Card>

							<Card className="widget mx-8 my-8 flex w-full sm:w-1/2 md:w-1/4 p-12">
								<h1>Categories </h1>
								<span>
									<h1 className="text-40">
										{category && category.payload && category.payload.length}
									</h1>
									<Icon className="text-blue text-60">category</Icon>
								</span>
							</Card>

							<Card className="widget mx-8 my-8 flex w-full sm:w-1/2 md:w-1/4 p-12">
								<h1>Customers </h1>
								<span>
									<h1 className="text-40">
										{customer && customer.payload && customer.payload.length}
									</h1>
									<Icon className="text-orange text-60">people_alt</Icon>
								</span>
							</Card>

							<Card className="widget mx-8 my-8 flex w-full sm:w-1/2 md:w-1/4 p-12">
								<h1>Orders </h1>
								<span>
									<h1 className="text-40">{order && order.payload && order.payload.data.count}</h1>
									<Icon className="text-yellow text-60">dvr</Icon>
								</span>
							</Card>
						</FuseAnimateGroup>
					)}
				</div>
			}

			// ref={pageLayout}
		/>
	);
}

export default withReducer('projectDashboardApp', reducer)(ProjectDashboardApp);
