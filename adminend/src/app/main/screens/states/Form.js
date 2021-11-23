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
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { resetStateField, saveState, newStateField, getState } from '../store/state/stateSlice';
import reducer from '../store';
import Card from '@material-ui/core/Card';
import Header from 'app/fuse-layouts/shared-components/Header';
import { useAlert } from 'react-alert';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

function StateForm(props) {
	const alert = useAlert();
	const dispatch = useDispatch();
	const state = useSelector(({ app }) => app.state);
	const pageLayout = useRef(null);
	const [noState, setNoState] = useState(false);
	const { form, handleChange, setForm, setInForm } = useForm(null);
	const routeParams = useParams();

	useDeepCompareEffect(() => {
		function updateState() {
			const { stateId } = routeParams;

			if (stateId === 'add') {
				dispatch(newStateField());
			} else {
				dispatch(getState(routeParams)).then(action => {
					if (!action.payload) {
						setNoState(true);
					}
				});
			}
		}

		updateState();
	}, [dispatch, routeParams]);

	useEffect(() => {
		if ((state && !form) || (state && form && state._id !== form._id)) {
			setForm(state);
		}
	}, [form, state, setForm]);

	useEffect(() => {
		return () => {
			dispatch(resetStateField());
			setNoState(false);
		};
	}, [dispatch]);

	function canBeSubmitted() {
		return form.title.length > 0 && !_.isEqual(state, form);
	}

	function saveSuccess() {
		alert.success('Saved!');
		props.history.push(`/admin/states`);
	}

	if (noState) {
		return (
			<FuseAnimate delay={100}>
				<div className="flex flex-col flex-1 items-center justify-center h-full">
					<Typography color="textSecondary" variant="h5">
						There is no such State!
					</Typography>
				</div>
			</FuseAnimate>
		);
	}

	if ((!state || (state && routeParams.stateId !== state._id)) && routeParams.stateId !== 'add') {
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
						headText="ADD STATE"
						backLink="/admin/states"
						icon="branding_watermark"
					/>
				}
				content={
					<Card className="mx-16 my-16">
						<div className="p-16 sm:p-24 max-w-2xl">
							<TextField
								className="mt-8 mb-16"
								error={form.title === ''}
								required
								label="State"
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
								error={form.tax_region === ''}
								required
								label="Tax Region"
								id="tax_region"
								name="tax_region"
								value={form.tax_region}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
							<TextField
								className="mt-8 mb-16"
								error={form.zipCode === ''}
								required
								label="zipCode"
								id="zipCode"
								name="zipCode"
								value={form.zipCode}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
							<TextField
								className="mt-8 mb-16"
								error={form.state_rate === ''}
								required
								label="State Rate Percentage"
								id="state_rate"
								name="state_rate"
								value={form.state_rate}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
							<TextField
								className="mt-8 mb-16"
								error={form.shipping_charge === ''}
								required
								label="Shipping Charge"
								id="shipping_charge"
								name="shipping_charge"
								value={form.shipping_charge}
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
							{/* <FormControl className="mt-8 mb-16" fullWidth>
								<FormControlLabel
									control={
										<Checkbox
											checked={form.home_include}
											onChange={handleChange}
											name="home_include"
										/>
									}
									label="Include In Home Page"
								/>
							</FormControl> */}

							<FuseAnimate animation="transition.slideLeftIn" delay={300}>
								<Button
									className="whitespace-nowrap"
									variant="contained"
									color="secondary"
									disabled={!canBeSubmitted()}
									onClick={() => dispatch(saveState(form)).then(() => saveSuccess())}
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

export default withReducer('app', reducer)(StateForm);
