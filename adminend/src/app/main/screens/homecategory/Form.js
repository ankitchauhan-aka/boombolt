import FusePageSimple from '@fuse/core/FusePageSimple';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FuseLoading from '@fuse/core/FuseLoading';
import Checkbox from '@material-ui/core/Checkbox';
import FuseChipSelect from '@fuse/core/FuseChipSelect';

import { useForm, useDeepCompareEffect } from '@fuse/hooks';
import _ from '@lodash';
import withReducer from 'app/store/withReducer';
import Card from '@material-ui/core/Card';
import React, { useEffect, useRef, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
	resetHomeCategory,
	saveHomeCategory,
	newHomeCategory,
	getHomeCategory
} from '../store/homecategory/homecategorySlice';
import { getCategories, selectCategories } from '../store/category/categoriesSlice';

import { getHomeCategories, selectHomeCategories } from '../store/homecategory/homecategoriesSlice';

import reducer from '../store';
import Header from 'app/fuse-layouts/shared-components/Header';

import { useAlert } from 'react-alert';
import clsx from 'clsx';
import Icon from '@material-ui/core/Icon';
import { orange } from '@material-ui/core/colors';

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

function HomeCategoryForm(props) {
	const alert = useAlert();
	const dispatch = useDispatch();
	const homecategory = useSelector(({ app }) => app.homecategory);
	const homecategories = useSelector(selectHomeCategories);
	const [noHomeCategory, setNoHomeCategory] = useState(false);
	const { form, handleChange, setForm, setInForm } = useForm(null);
	const classes = useStyles(props);
	const routeParams = useParams();
	const [categoryOptions, setCategoryOptions] = useState([]);

	const pageLayout = useRef(null);
	const categories = useSelector(selectCategories);
	useEffect(() => {
		dispatch(getCategories());
		dispatch(getHomeCategories());
	}, [dispatch]);

	useDeepCompareEffect(() => {
		function updateHomeCategoryState() {
			const { homecategoryId } = routeParams;

			if (homecategoryId === 'add') {
				dispatch(newHomeCategory());
			} else {
				dispatch(getHomeCategory(routeParams)).then(action => {
					if (!action.payload) {
						setNoHomeCategory(true);
					}
				});
			}
		}

		updateHomeCategoryState();
	}, [dispatch, routeParams]);

	useEffect(() => {
		if ((homecategory && !form) || (homecategory && form && homecategory._id !== form._id)) {
			setForm(homecategory);
		}
	}, [form, homecategory, setForm]);

	useEffect(() => {
		return () => {
			dispatch(resetHomeCategory());
			setNoHomeCategory(false);
		};
	}, [dispatch]);

	function canBeSubmitted() {
		return form.categories.length > 0 && !_.isEqual(homecategory, form);
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

	function saveSuccess() {
		alert.success('Saved!');
		props.history.push(`/admin/homecategories`);
	}

	useEffect(() => {
		if (categories) {
			const catSuggestions = categories.map(category => ({ value: category._id, label: category.title }));
			setCategoryOptions(catSuggestions);
		}
	}, [categories]);

	if (noHomeCategory) {
		return (
			<FuseAnimate delay={100}>
				<div className="flex flex-col flex-1 items-center justify-center h-full">
					<Typography color="textSecondary" variant="h5">
						There is no such HomeCategory!
					</Typography>
				</div>
			</FuseAnimate>
		);
	}

	if (
		(!homecategory || (homecategory && routeParams.homecategoryId !== homecategory._id)) &&
		routeParams.homecategoryId !== 'add'
	) {
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
						headText="ADD HOME CATEGORY"
						backLink="/admin/homecategories"
						icon="homecategory"
					/>
				}
				content={
					<Card className="mx-16 my-16">
						<div className="p-16 sm:p-24 max-w-2xl">
							{/* <TextField
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
							/> */}
							<FuseChipSelect
								className="mt-8 mb-24"
								value={form.categories.map(item => ({
									value: item.id ? item.id : '',
									label: item.slug ? item.slug : item.label
								}))}
								onChange={value => setInForm('categories', value)}
								placeholder="Select Product Categories"
								error={form.categories === ''}
								textFieldProps={{
									label: 'Categories',
									InputLabelProps: {
										shrink: true
									},
									variant: 'outlined'
								}}
								options={categoryOptions}
								isMulti
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
											{/* <Icon className={clsx (classes.productImageFeaturedStar, "text-red text-20")} onClick={() => {form.image = ''}}>
												remove_circle
											</Icon> */}
											<img className="max-w-none w-auto h-full" src={form.image} alt="products" />
										</div>
									)}
								</div>
							</div>
							<FuseAnimate animation="transition.slideLeftIn" delay={500}>
								<Button
									className="whitespace-nowrap"
									variant="contained"
									color="secondary"
									disabled={!canBeSubmitted()}
									onClick={() => dispatch(saveHomeCategory(form)).then(() => saveSuccess())}
								>
									Save
								</Button>
							</FuseAnimate>
							<FuseAnimate animation="transition.slideLeftIn" delay={300}>
								<Button
									className="mx-8 whitespace-nowrap"
									component={Link}
									variant="outlined"
									to="/admin/homecategories"
									color="primary"
								>
									Cancel
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

export default withReducer('app', reducer)(HomeCategoryForm);
