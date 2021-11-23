import FusePageSimple from '@fuse/core/FusePageSimple';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FuseLoading from '@fuse/core/FuseLoading';
import Checkbox from '@material-ui/core/Checkbox';
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
import { resetCategory, saveCategory, newCategory, getCategory } from '../store/category/categorySlice';
import { getCategories, selectCategories } from '../store/category/categoriesSlice';

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

function CategoryForm(props) {
	const alert = useAlert();
	const dispatch = useDispatch();
	const category = useSelector(({ app }) => app.category);
	const categories = useSelector(selectCategories);
	const [noCategory, setNoCategory] = useState(false);
	const { form, handleChange, setForm, setInForm } = useForm(null);
	const classes = useStyles(props);
	const routeParams = useParams();
	const pageLayout = useRef(null);

	useEffect(() => {
		dispatch(getCategories());
	}, [dispatch]);

	useDeepCompareEffect(() => {
		function updateCategoryState() {
			const { categoryId } = routeParams;

			if (categoryId === 'add') {
				dispatch(newCategory());
			} else {
				dispatch(getCategory(routeParams)).then(action => {
					if (!action.payload) {
						setNoCategory(true);
					}
				});
			}
		}

		updateCategoryState();
	}, [dispatch, routeParams]);

	useEffect(() => {
		if ((category && !form) || (category && form && category._id !== form._id)) {
			setForm(category);
		}
	}, [form, category, setForm]);

	useEffect(() => {
		return () => {
			dispatch(resetCategory());
			setNoCategory(false);
		};
	}, [dispatch]);

	function canBeSubmitted() {
		return form.title.length > 0 && !_.isEqual(category, form);
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
		props.history.push(`/admin/categories`);
	}

	if (noCategory) {
		return (
			<FuseAnimate delay={100}>
				<div className="flex flex-col flex-1 items-center justify-center h-full">
					<Typography color="textSecondary" variant="h5">
						There is no such Category!
					</Typography>
				</div>
			</FuseAnimate>
		);
	}

	if ((!category || (category && routeParams.categoryId !== category._id)) && routeParams.categoryId !== 'add') {
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
						headText="ADD CATEGORY"
						backLink="/admin/categories"
						icon="category"
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
								<InputLabel>Parent</InputLabel>
								<Select
									label="Parent"
									id="parent"
									name="parent"
									value={form.parent}
									onChange={handleChange}
								>
									<MenuItem value="">
										<em>None</em>
									</MenuItem>
									{categories.map(category =>
										form ? (
											category.title != form.title && category.parent == '' ? (
												<MenuItem key={category._id} value={category._id}>
													{category.title}
												</MenuItem>
											) : (
												<span key={Math.random()}></span>
											)
										) : (
											<MenuItem key={category._id} value={category._id}>
												{category.title}
											</MenuItem>
										)
									)}
								</Select>
							</FormControl>
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
							<FormControl className="mt-8 mb-16" fullWidth>
								<FormControlLabel
									control={
										<Checkbox
											checked={form.home_include}
											onChange={handleChange}
											name="home_include"
										/>
									}
									label="Include In Home Categories"
								/>
							</FormControl>
							<FormControl className="mt-8 mb-16" fullWidth>
								<FormControlLabel
									control={
										<Checkbox
											checked={form.nav_include}
											onChange={handleChange}
											name="nav_include"
										/>
									}
									label="Include In Top Nav"
								/>
							</FormControl>
							<FuseAnimate animation="transition.slideLeftIn" delay={500}>
								<Button
									className="whitespace-nowrap"
									variant="contained"
									color="secondary"
									disabled={!canBeSubmitted()}
									onClick={() => dispatch(saveCategory(form)).then(() => saveSuccess())}
								>
									Save
								</Button>
							</FuseAnimate>
							<FuseAnimate animation="transition.slideLeftIn" delay={300}>
								<Button
									className="mx-8 whitespace-nowrap"
									component={Link}
									variant="outlined"
									to="/admin/categories"
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

export default withReducer('app', reducer)(CategoryForm);
