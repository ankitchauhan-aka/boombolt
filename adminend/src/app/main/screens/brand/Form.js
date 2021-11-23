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
import { resetBrand, saveBrand, newBrand, getBrand } from '../store/brand/brandSlice';
import reducer from '../store';
import Card from '@material-ui/core/Card';
import Header from 'app/fuse-layouts/shared-components/Header';
import { useAlert } from 'react-alert';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import clsx from 'clsx';
import Icon from '@material-ui/core/Icon';
import { orange } from '@material-ui/core/colors';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles(theme => ({
	productImageFeaturedStar: {
		position: 'absolute',
		top: 0,
		right: 0,
		color: orange[400],
		opacity: 0
	},
	productImageUpload: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut
	},
	productImageItem: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut,
		'&:hover': {
			'& $productImageFeaturedStar': {
				opacity: 0.8
			}
		},
		'&.featured': {
			pointerEvents: 'none',
			boxShadow: theme.shadows[3],
			'& $productImageFeaturedStar': {
				opacity: 1
			},
			'&:hover $productImageFeaturedStar': {
				opacity: 1
			}
		}
	}
}));

function BrandForm(props) {
	const alert = useAlert();
	const dispatch = useDispatch();
	const brand = useSelector(({ app }) => app.brand);
	const pageLayout = useRef(null);
	const [noBrand, setNoBrand] = useState(false);
	const classes = useStyles(props);
	const { form, handleChange, setForm, setInForm } = useForm(null);
	const routeParams = useParams();

	useDeepCompareEffect(() => {
		function updateBrandState() {
			const { brandId } = routeParams;

			if (brandId === 'add') {
				dispatch(newBrand());
			} else {
				dispatch(getBrand(routeParams)).then(action => {
					if (!action.payload) {
						setNoBrand(true);
					}
				});
			}
		}

		updateBrandState();
	}, [dispatch, routeParams]);

	useEffect(() => {
		if ((brand && !form) || (brand && form && brand._id !== form._id)) {
			setForm(brand);
		}
	}, [form, brand, setForm]);

	useEffect(() => {
		return () => {
			dispatch(resetBrand());
			setNoBrand(false);
		};
	}, [dispatch]);

	function canBeSubmitted() {
		return form.title.length > 0 && form.image && !_.isEqual(brand, form);
	}

	function saveSuccess() {
		alert.success('Saved!');
		props.history.push(`/admin/brands`);
	}
	function handleUploadChange(e) {
		const file = e.target.files[0];
		if (!file) {
			return;
		}
		const reader = new FileReader();
		reader.readAsBinaryString(file);

		reader.onload = () => {
			setForm(_.set({ ...form }, `image`, `data:${file.type};base64,${btoa(reader.result)}`));
		};

		reader.onerror = () => {
			console.log('error on load image');
		};
	}

	if (noBrand) {
		return (
			<FuseAnimate delay={100}>
				<div className="flex flex-col flex-1 items-center justify-center h-full">
					<Typography color="textSecondary" variant="h5">
						There is no such Brand!
					</Typography>
				</div>
			</FuseAnimate>
		);
	}

	if ((!brand || (brand && routeParams.brandId !== brand._id)) && routeParams.brandId !== 'add') {
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
						headText="ADD BRAND"
						backLink="/admin/brands"
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
								label="Title"
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
								error={form.slug === ''}
								required
								label="Slug"
								id="slug"
								name="slug"
								value={form.slug}
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
							<FormControl className="mt-8 mb-16" fullWidth>
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
							</FormControl>
							<div>
								<div className="flex justify-center sm:justify-start flex-wrap -mx-8">
									<label
										htmlFor="button-file"
										className={clsx(
											classes.productImageUpload,
											'flex items-center justify-center relative w-128 h-128 rounded-8 mx-8 mb-16 overflow-hidden cursor-pointer shadow hover:shadow-lg'
										)}
									>
										<input
											accept="image/*"
											className="hidden"
											id="button-file"
											type="file"
											onChange={handleUploadChange}
										/>
										<Icon fontSize="large" color="action">
											cloud_upload
										</Icon>
									</label>
									{form.image && (
										<div
											role="button"
											tabIndex={0}
											className={clsx(
												classes.productImageItem,
												'flex items-center justify-center relative w-128 h-128 rounded-8 mx-8 mb-16 overflow-hidden cursor-pointer outline-none shadow hover:shadow-lg'
											)}
										>
											<img className="max-w-none w-auto h-full" src={form.image} alt="products" />
										</div>
									)}
								</div>
							</div>

							<FuseAnimate animation="transition.slideLeftIn" delay={300}>
								<Button
									className="whitespace-nowrap"
									variant="contained"
									color="secondary"
									disabled={!canBeSubmitted()}
									onClick={() => dispatch(saveBrand(form)).then(() => saveSuccess())}
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

export default withReducer('app', reducer)(BrandForm);
