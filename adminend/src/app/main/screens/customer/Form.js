import FusePageSimple from '@fuse/core/FusePageSimple';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';
import { useForm, useDeepCompareEffect } from '@fuse/hooks';
import _ from '@lodash';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useRef, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { resetCustomer, getCustomer, newCustomer, saveCustomer } from '../store/customer/customerSlice';
import reducer from '../store';
import { orange } from '@material-ui/core/colors';
import Card from '@material-ui/core/Card';
import Header from 'app/fuse-layouts/shared-components/Header';
import { useAlert } from 'react-alert'

const useStyles = makeStyles(theme => ({
    productImageFeaturedStar: {
        position: 'absolute',
        top: 0,
        right: 0,
        color: orange[400],
        opacity: 0
    }
}));

function UserForm(props) {
	
	const alert = useAlert()
	const dispatch = useDispatch();
	const customer = useSelector(({ app }) => app.customer);
	const pageLayout = useRef(null);
	const [noCustomer, setNoCustomer] = useState(false);
	const { form, handleChange, setForm, setInForm } = useForm(null);
	const routeParams = useParams();
    const classes = useStyles(props);


	useDeepCompareEffect(() => {
		function updateBrandState() {
			const { userId } = routeParams;

			if (userId === 'add') {
				dispatch(newCustomer());
			} else {
				dispatch(getCustomer(routeParams)).then(action => {
					if (!action.payload) {
						setNoCustomer(true);
					}
				});
			}
		}

		updateBrandState();
	}, [dispatch, routeParams]);

	useEffect(() => {
		if ((customer && !form) || (customer && form && customer._id !== form._id)) {
			setForm(customer);
		}
	}, [form, customer, setForm]);

	useEffect(() => {
		return () => {
			dispatch(resetCustomer());
			setNoCustomer(false);
		};
	}, [dispatch]);

	function canBeSubmitted() {
		return form.title.length > 0 && !_.isEqual(customer, form);
	}

	function saveSuccess() {
		alert.success('Saved!');
		props.history.push(`/admin/customers`);
	}

    if (noCustomer) {
		return (
			<FuseAnimate delay={100}>
				<div className="flex flex-col flex-1 items-center justify-center h-full">
					<Typography color="textSecondary" variant="h5">
						There is no such Customers!
					</Typography>
				</div>
			</FuseAnimate>
		);
	}

	if ((!customer || (customer && routeParams.userId !== customer._id)) && routeParams.userId !== 'add') {
		return <FuseLoading />;
	}

	
	
	return form && 
			<FusePageSimple
				classes={{
					content: 'min-h-full',
					header: 'min-h-72 h-72'
				}}
				header={<Header pageLayout={pageLayout} headText="ADD CUSTOMER" backLink="/admin/customers" icon="people_alt" />}
				content={
					<Card className="mx-16 my-16">
						<div className="p-16 sm:p-24 max-w-2xl">
							<TextField
								className="mt-8 mb-16"
								// error={form.lastName === ''}
								label="FirstName"
								autoFocus
								id="firstname"
								name="firstName"
								value={form.firstName}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
							<TextField
								className="mt-8 mb-16"
								// error={form.lastName === ''}
								label="LastName"
								autoFocus
								id="lastname"
								name="lastName"
								value={form.lastName}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
							<TextField
								className="mt-8 mb-16"
								// error={form.email === ''}
								label="Email"
								id="email"
								name="email"
								value={form.email}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
							<TextField
								className="mt-8 mb-16"
								// error={form.phone === ''}
								label="Phone"
								id="phone"
								name="phone"
								value={form.phone}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
							<FormControl variant="outlined" className="mt-8 mb-16" fullWidth>
								<InputLabel>Status</InputLabel>
								<Select
									label="Status"
									id="active"
									name="active"
									value={form.active || 'true'}
									onChange={handleChange}
								>
									<MenuItem value="true">Active</MenuItem>
									<MenuItem value="false">InActive</MenuItem>
								</Select>
							</FormControl>
							<FuseAnimate animation="transition.slideLeftIn" delay={300}>
								<Button
									className="whitespace-nowrap"
									variant="contained"
									color="secondary"
									// disabled={!canBeSubmitted()}
									onClick={() => dispatch(saveCustomer(form)).then( () => saveSuccess())}
								>
									Save
								</Button>
							</FuseAnimate>
						</div>
					</Card>
				}
				ref={pageLayout}
				innerScroll
			/>
}

export default withReducer('app', reducer)(UserForm);
