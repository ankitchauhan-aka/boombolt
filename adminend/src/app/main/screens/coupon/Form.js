import FusePageSimple from '@fuse/core/FusePageSimple';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';
import { useForm, useDeepCompareEffect } from '@fuse/hooks';
import _ from '@lodash';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useRef, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { resetCoupon, saveCoupon, newCoupon, getCoupon } from '../store/coupon/couponSlice';
import reducer from '../store';
import Card from '@material-ui/core/Card';
import Header from 'app/fuse-layouts/shared-components/Header';
import { useAlert } from 'react-alert';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

function CouponForm(props) {
	const alert = useAlert();
	const dispatch = useDispatch();
	const coupon = useSelector(({ app }) => app.coupon);
	const pageLayout = useRef(null);
	const [noCoupon, setNoCoupon] = useState(false);
	const { form, handleChange, setForm, setInForm } = useForm(null);
	const routeParams = useParams();

	useDeepCompareEffect(() => {
		function updateCouponState() {
			const { couponId } = routeParams;

			if (couponId === 'add') {
				dispatch(newCoupon());
			} else {
				dispatch(getCoupon(routeParams)).then(action => {
					if (!action.payload) {
						setNoCoupon(true);
					}
				});
			}
		}

		updateCouponState();
	}, [dispatch, routeParams]);

	useEffect(() => {
		if ((coupon && !form) || (coupon && form && coupon._id !== form._id)) {
			setForm(coupon);
		}
	}, [form, coupon, setForm]);

	useEffect(() => {
		return () => {
			dispatch(resetCoupon());
			setNoCoupon(false);
		};
	}, [dispatch]);

	function canBeSubmitted() {
		return form.title.length > 0 && !_.isEqual(coupon, form);
	}

	function saveSuccess() {
		alert.success('Saved!');
		props.history.push(`/admin/coupons`);
	}

	if (noCoupon) {
		return (
			<FuseAnimate delay={100}>
				<div className="flex flex-col flex-1 items-center justify-center h-full">
					<Typography color="textSecondary" variant="h5">
						There is no such Coupon!
					</Typography>
				</div>
			</FuseAnimate>
		);
	}

	if ((!coupon || (coupon && routeParams.couponId !== coupon._id)) && routeParams.couponId !== 'add') {
		return <FuseLoading />;
	}

	return (
		form && (
			<FusePageSimple
				classes={{
					content: 'min-h-full',
					header: 'min-h-72 h-72'
				}}
				header={
					<Header
						pageLayout={pageLayout}
						headText="ADD COUPON"
						backLink="/admin/coupons"
						icon="local_offer"
					/>
				}
				content={
					<Card className="mx-16 my-16">
						<div className="p-16 sm:p-24 max-w-2xl">
							<TextField
								className="mt-8 mb-16"
								error={form.title === ''}
								required
								label="Coupon Code"
								autoFocus
								id="title"
								name="title"
								value={form.title}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
							<TextField
								className="mt-8 mb-16"
								label="Description"
								id="desc"
								name="desc"
								value={form.desc}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
							<FormControl variant="outlined" className="mt-8 mb-16" fullWidth>
								<InputLabel>Coupon Type</InputLabel>
								<Select
									label="Coupon Type"
									id="coupon_type"
									name="coupon_type"
									value={form.coupon_type}
									onChange={handleChange}
								>
									<MenuItem value="AMOUNT">Amount</MenuItem>
									<MenuItem value="PERCENTAGE">Percentage</MenuItem>
								</Select>
							</FormControl>
							<TextField
								className="mt-8 mb-16"
								error={form.weightage === 0}
								required
								label="Weightage"
								id="weightage"
								name="weightage"
								type="number"
								value={form.weightage >= 0 ? form.weightage : 0}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
							<TextField
								className="mt-8 mb-16"
								error={form.total === ''}
								required
								label="Total Coupons"
								id="total"
								name="total"
								type="number"
								value={form.total >= 0 ? form.total : 0}
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
									disabled={!canBeSubmitted()}
									onClick={() => dispatch(saveCoupon(form)).then(() => saveSuccess())}
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
		)
	);
}

export default withReducer('app', reducer)(CouponForm);
