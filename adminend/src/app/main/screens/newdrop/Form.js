import FusePageSimple from '@fuse/core/FusePageSimple';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';
import { useForm, useDeepCompareEffect } from '@fuse/hooks';
import _ from '@lodash';
import FuseChipSelect from '@fuse/core/FuseChipSelect';
import { orange } from '@material-ui/core/colors';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useRef, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { resetBanner, saveNewDrop, newBanner, getNewDrop } from '../store/newdrop/newdropSlice';
import reducer from '../store';
import Card from '@material-ui/core/Card';
import Header from 'app/fuse-layouts/shared-components/Header';
import { useAlert } from 'react-alert';
import clsx from 'clsx';
import Icon from '@material-ui/core/Icon';
import { getCategories, selectCategories } from '../store/category/categoriesSlice';

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

function NewDropForm(props) {
	const alert = useAlert();
	const dispatch = useDispatch();
	const banner = useSelector(({ app }) => app.banner);
	const pageLayout = useRef(null);
	const [noBanner, setNoBanner] = useState(false);
	const { form, handleChange, setForm, setInForm } = useForm(null);
	const routeParams = useParams();
	const classes = useStyles(props);
	const categories = useSelector(selectCategories);
	const [categoryOptions, setCategoryOptions] = useState([]);

	useDeepCompareEffect(() => {
		function updateBannerState() {
			const { bannerId } = routeParams;

			if (bannerId === 'add') {
				dispatch(newBanner());
			} else {
				dispatch(getNewDrop(routeParams)).then(action => {
					if (!action.payload) {
						setNoBanner(true);
					}
				});
			}
		}

		updateBannerState();
	}, [dispatch, routeParams]);

	useEffect(() => {
		if ((banner && !form) || (banner && form && banner._id !== form._id)) {
			setForm(banner);
		}
	}, [form, banner, setForm]);

	useEffect(() => {
		dispatch(getCategories());
		return () => {
			dispatch(resetBanner());
			setNoBanner(false);
		};
	}, [dispatch]);
	useEffect(() => {
		if (categories) {
			const catSuggestions = categories.map(category => ({ value: category._id, label: category.title }));
			setCategoryOptions(catSuggestions);
		}
	}, [categories]);
	function canBeSubmitted() {
		return form.title.length > 0 && form.backimage && form.logo && form.categories && !_.isEqual(banner, form);
	}

	function saveSuccess() {
		alert.success('Saved!');
		props.history.push(`/admin/newdrops`);
	}

	function handleUploadChange(e) {
		const file = e.target.files[0];
		if (!file) {
			return;
		}
		const reader = new FileReader();
		reader.readAsBinaryString(file);

		reader.onload = () => {
			setForm(_.set({ ...form }, `backimage`, `data:${file.type};base64,${btoa(reader.result)}`));
		};

		reader.onerror = () => {
			console.log('error on load image');
		};
	}
	function handlelogoChange(e) {
		const file = e.target.files[0];
		if (!file) {
			return;
		}
		const reader = new FileReader();
		reader.readAsBinaryString(file);

		reader.onload = () => {
			setForm(_.set({ ...form }, `logo`, `data:${file.type};base64,${btoa(reader.result)}`));
		};
		reader.onerror = () => {
			console.log('error on load image');
		};
	}

	if (noBanner) {
		return (
			<FuseAnimate delay={100}>
				<div className="flex flex-col flex-1 items-center justify-center h-full">
					<Typography color="textSecondary" variant="h5">
						There is no such Banner!
					</Typography>
				</div>
			</FuseAnimate>
		);
	}

	if ((!banner || (banner && routeParams.bannerId !== banner._id)) && routeParams.bannerId !== 'add') {
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
						headText="ADD BANNER"
						backLink="/admin/newdrops"
						icon="view_carousel"
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
							<FuseChipSelect
								className="mt-8 mb-24"
								value={form?.categories?.map(item => ({
									value: item.id ? item.id : '',
									label: item.slug ? item.slug : item.label
								}))}
								onChange={value => setInForm('categories', value)}
								placeholder="Select Product Categories"
								error={form?.categories === ''}
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
							backImage
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
										required
										className="hidden"
										id="button-file"
										type="file"
										onChange={handleUploadChange}
									/>
									<Icon fontSize="large" color="action">
										cloud_upload
									</Icon>
								</label>

								{form.backimage && (
									<div
										// onClick={() => setInForm('featuredImageId', media.id)}
										// onKeyDown={() => setInForm('featuredImageId', media.id)}
										role="button"
										tabIndex={0}
										className={clsx(
											classes.productImageItem,
											'flex items-center justify-center relative w-128 h-128 rounded-8 mx-8 mb-16 overflow-hidden cursor-pointer outline-none shadow hover:shadow-lg'
										)}
									>
										{/* <Icon className={classes.productImageFeaturedStar}>star</Icon> */}
										<img className="max-w-none w-auto h-full" src={form.backimage} alt="product" />
									</div>
								)}
							</div>
							logo
							<div className="flex justify-center sm:justify-start flex-wrap -mx-8">
								<label
									htmlFor="button-file1"
									className={clsx(
										classes.productImageUpload,
										'flex items-center justify-center relative w-128 h-128 rounded-8 mx-8 mb-16 overflow-hidden cursor-pointer shadow hover:shadow-lg'
									)}
								>
									<input
										accept="image/*"
										required
										className="hidden"
										id="button-file1"
										type="file"
										onChange={handlelogoChange}
									/>
									<Icon fontSize="large" color="action">
										cloud_upload
									</Icon>
								</label>

								{form.logo && (
									<div
										// onClick={() => setInForm('featuredImageId', media.id)}
										// onKeyDown={() => setInForm('featuredImageId', media.id)}
										role="button"
										tabIndex={0}
										className={clsx(
											classes.productImageItem,
											'flex items-center justify-center relative w-128 h-128 rounded-8 mx-8 mb-16 overflow-hidden cursor-pointer outline-none shadow hover:shadow-lg'
										)}
									>
										{/* <Icon className={classes.productImageFeaturedStar}>star</Icon> */}
										<img className="max-w-none w-auto h-full" src={form.logo} alt="product" />
									</div>
								)}
							</div>
							<FuseAnimate animation="transition.slideLeftIn" delay={300}>
								<Button
									className="whitespace-nowrap"
									variant="contained"
									color="secondary"
									disabled={!canBeSubmitted()}
									onClick={() => dispatch(saveNewDrop(form)).then(() => saveSuccess())}
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

export default withReducer('app', reducer)(NewDropForm);
