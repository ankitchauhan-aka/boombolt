// import FusePageSimple from '@fuse/core/FusePageSimple';
// import FuseAnimate from '@fuse/core/FuseAnimate';
// import FuseLoading from '@fuse/core/FuseLoading';
// import React, { useEffect, useRef, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, useParams } from 'react-router-dom';
// import { useForm, useDeepCompareEffect } from '@fuse/hooks';
// import TextField from '@material-ui/core/TextField';
// import reducer from '../../store';
// import Header from 'app/fuse-layouts/shared-components/Header';
// import FusePageCarded from '@fuse/core/FusePageCarded';
// import Avatar from '@material-ui/core/Avatar';
// import Accordion from '@material-ui/core/Accordion';
// import AccordionDetails from '@material-ui/core/AccordionDetails';
// import AccordionSummary from '@material-ui/core/AccordionSummary';
// import Button from '@material-ui/core/Button';
// import Icon from '@material-ui/core/Icon';
// import { useTheme } from '@material-ui/core/styles';
// import Tab from '@material-ui/core/Tab';
// import Tabs from '@material-ui/core/Tabs';
// import Tooltip from '@material-ui/core/Tooltip';
// import Typography from '@material-ui/core/Typography';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import withReducer from 'app/store/withReducer';
// import GoogleMap from 'google-map-react';
// import MenuItem from '@material-ui/core/MenuItem';
// import Select from '@material-ui/core/Select';
// import Checkbox from '@material-ui/core/Checkbox';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import { resetCustomer, getCustomer } from '../../store/customer/customerSlice';

// function Marker(props) {
// 	return (
// 		<Tooltip title={props.text} placement="top">
// 			<Icon className="text-red">place</Icon>
// 		</Tooltip>
// 	);
// }

// function Customer(props) {
// 	const dispatch = useDispatch();

// 	const customer = useSelector(({ app }) => app.customer);
// 	const pageLayout = useRef(null);
// 	const [noCustomer, setNoCustomer] = useState(false);
// 	const routeParams = useParams();
// 	const { form, handleChange, setForm, setInForm } = useForm(null);

// 	useDeepCompareEffect(() => {
// 		function updateCustomer() {
// 			dispatch(getCustomer(routeParams)).then(action => {
// 				if (!action.payload) {
// 					setNoCustomer(true);
// 				}
// 			});
// 		}

// 		updateCustomer();
// 	}, [dispatch, routeParams]);

// 	useEffect(() => {
// 		return () => {
// 			dispatch(resetCustomer());
// 			setNoCustomer(false);
// 		};
// 	}, [dispatch]);

// 	if (noCustomer) {
// 		return (
// 			<FuseAnimate delay={100}>
// 				<div className="flex flex-col flex-1 items-center justify-center h-full">
// 					<Typography color="textSecondary" variant="h5">
// 						There is no such Customer!
// 					</Typography>
// 				</div>
// 			</FuseAnimate>
// 		);
// 	}

// 	if ((!customer || (customer && routeParams.userId !== customer._id)) && routeParams.userId !== 'add') {
// 		return <FuseLoading />;
// 	}

// 	return (
// 		customer && (
// 			<FusePageSimple
// 				classes={{
// 					content: 'min-h-full',
// 					header: 'min-h-72 h-72'
// 				}}
// 				header={
// 					<Header
// 						pageLayout={pageLayout}
// 						headText="ADD STATE"
// 						backLink="/admin/customers"
// 						icon="branding_watermark"
// 					/>
// 				}
// 				content={
// 					<div className="p-16 sm:p-24 max-w-2xl">
// 						<TextField
// 							className="mt-8 mb-16"
// 							error={customer?.firstName === ''}
// 							required
// 							label="First Name"
// 							autoFocus
// 							id="title"
// 							name="title"
// 							value={customer?.firstName}
// 							onChange={handleChange}
// 							variant="outlined"
// 							fullWidth
// 						/>
// 						<TextField
// 							className="mt-8 mb-16"
// 							error={customer?.lastName === ''}
// 							required
// 							label="Last Name"
// 							id="tax_region"
// 							name="tax_region"
// 							value={customer?.lastName}
// 							onChange={handleChange}
// 							variant="outlined"
// 							fullWidth
// 						/>
// 						<TextField
// 							className="mt-8 mb-16"
// 							error={customer?.email === ''}
// 							required
// 							label="Email"
// 							id="zipCode"
// 							name="zipCode"
// 							value={customer?.email}
// 							onChange={handleChange}
// 							variant="outlined"
// 							fullWidth
// 						/>
// 						<TextField
// 							className="mt-8 mb-16"
// 							error={customer?.phone === ''}
// 							required
// 							label="Phone"
// 							id="state_rate"
// 							name="state_rate"
// 							value={customer?.phone}
// 							onChange={handleChange}
// 							variant="outlined"
// 							fullWidth
// 						/>
// 					</div>
// 				}
// 				ref={pageLayout}
// 				innerScroll
// 			/>
// 		)
// 	);
// }

// export default withReducer('app', reducer)(Customer);
