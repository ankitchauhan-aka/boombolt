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
import { resetTaxField, saveTax, newTaxField, getTax } from '../store/tax/taxSlice';
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

function TaxForm(props) {
	const alert = useAlert();
	const dispatch = useDispatch();
	const tax = useSelector(({ app }) => app.tax);
	const pageLayout = useRef(null);
	const [noTax, setNoTax] = useState(false);
	const { form, handleChange, setForm, setInForm } = useForm(null);
	const routeParams = useParams();

	useDeepCompareEffect(() => {
		function updateTax() {
			const { taxId } = routeParams;

			if (taxId === 'add') {
				dispatch(newTaxField());
			} else {
				dispatch(getTax(routeParams)).then(action => {
					if (!action.payload) {
						setNoTax(true);
					}
				});
			}
		}

		updateTax();
	}, [dispatch, routeParams]);

	useEffect(() => {
		if ((tax && !form) || (tax && form && tax._id !== form._id)) {
			setForm(tax);
		}
	}, [form, tax, setForm]);

	useEffect(() => {
		return () => {
			dispatch(resetTaxField());
			setNoTax(false);
		};
	}, [dispatch]);

	function canBeSubmitted() {
		return form.tax.length > 0 && !_.isEqual(tax, form);
	}

	function saveSuccess() {
		alert.success('Saved!');
		props.history.push(`/admin/taxes`);
	}

	if (noTax) {
		return (
			<FuseAnimate delay={100}>
				<div className="flex flex-col flex-1 items-center justify-center h-full">
					<Typography color="textSecondary" variant="h5">
						There is no such Tax!
					</Typography>
				</div>
			</FuseAnimate>
		);
	}

	if ((!tax || (tax && routeParams.taxId !== tax._id)) && routeParams.taxId !== 'add') {
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
						headText="ADD TAX"
						backLink="/admin/taxes"
						icon="dvr"
					/>
				}
				content={
					<Card className="mx-16 my-16">
						<div className="p-16 sm:p-24 max-w-2xl">
							<TextField
								className="mt-8 mb-16"
								error={form.tax === ''}
								required
								label="Tax"
								autoFocus
								id="tax"
								name="tax"
								value={form.tax >= 0 ? form.tax : 0}
								onChange={handleChange}
								variant="outlined"
								fullWidth
								type="number"
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
									onClick={() => dispatch(saveTax(form)).then(() => saveSuccess())}
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

export default withReducer('app', reducer)(TaxForm);
