import FusePageSimple from '@fuse/core/FusePageSimple';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';
import { useForm, useDeepCompareEffect } from '@fuse/hooks';
import _ from '@lodash';
import InputAdornment from '@material-ui/core/InputAdornment';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useRef, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { resetSpecs, saveSpecs, newSpecs, getSpecs } from '../store/specs/specSlice';
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
import FuseUtils from '@fuse/utils';

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

function SpecsForm(props) {
	const alert = useAlert();
	const dispatch = useDispatch();
	const specs = useSelector(({ app }) => app.spec);
	const pageLayout = useRef(null);
	const [noSpecs, setNoSpecs] = useState(false);
	const classes = useStyles(props);
	const { form, handleChange, setForm, setInForm } = useForm(null);
	const routeParams = useParams();

	useDeepCompareEffect(() => {
		function updateSpecsState() {
			const { specsId } = routeParams;

			if (specsId === 'add') {
				dispatch(newSpecs());
			} else {
				dispatch(getSpecs(routeParams)).then(action => {
					if (!action.payload) {
						setNoSpecs(true);
					}
				});
			}
		}

		updateSpecsState();
	}, [dispatch, routeParams]);

	useEffect(() => {
		if ((specs && !form) || (specs && form && specs._id !== form._id)) {
			setForm(specs);
		}
	}, [form, specs, setForm]);

	function addAttributes() {
		
		let formData = {title: form.title, attrs: form.attrs};
		if (form._id) {
			formData._id =  form._id
		}
		formData.attrs = [...form.attrs, {value: ''}]
		setForm(formData)
	}

	function handleAttributeChange(index, value) {
		let formData = {title: form.title, attrs: form.attrs};
		if (form._id) {
			formData._id =  form._id
		}
		formData.attrs[index].value = value;
		setForm(formData)
	}

	useEffect(() => {
		return () => {
			dispatch(resetSpecs());
			setNoSpecs(false);
		};
	}, [dispatch]);

	function canBeSubmitted() {
		return form.title.length > 0 && !_.isEqual(specs, form);
	}

	function saveSuccess() {
		alert.success('Saved!');
		props.history.push(`/admin/specs`);
	}
	

	if (noSpecs) {
		return (
			<FuseAnimate delay={100}>
				<div className="flex flex-col flex-1 items-center justify-center h-full">
					<Typography color="textSecondary" variant="h5">
						There is no such Specs!
					</Typography>
				</div>
			</FuseAnimate>
		);
	}

	if ((!specs || (specs && routeParams.specsId !== specs._id)) && routeParams.specsId !== 'add') {
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
						headText="ADD SPECS"
						backLink="/admin/specs"
						icon="loupe"
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
							{form.attrs.map((attr, index) => 
								<TextField
									className="mt-8 mb-16"
									error={attr === ''}
									required
									key={`attr_${index}`}
									label="Attribute Name"
									id={`attr_${index}`}
									name={`attr_${index}`}
									value={attr.value}
									onChange={e => handleAttributeChange(index, e.target.value)}
									// InputProps={{
									// 	endAdornment: <InputAdornment position="end">
									// 		<Icon className="text-20 red">remove_circle</Icon>
									// </InputAdornment>
									// }}
									variant="outlined"
									fullWidth
								/>
								)
							}
							<Button
								className="whitespace-nowrap"
								variant="contained"
								color="primary"
								onClick={() => addAttributes()}
							>
								Add Attribute
							</Button><br/><br/>
							<FuseAnimate animation="transition.slideLeftIn" delay={300}>
								<Button
									className="whitespace-nowrap"
									variant="contained"
									color="secondary"
									disabled={!canBeSubmitted()}
									onClick={() => dispatch(saveSpecs(form)).then(() => saveSuccess())}
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

export default withReducer('app', reducer)(SpecsForm);
