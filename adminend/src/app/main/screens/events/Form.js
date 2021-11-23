import FusePageSimple from '@fuse/core/FusePageSimple';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';
import { useForm, useDeepCompareEffect } from '@fuse/hooks';
import _ from '@lodash';
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
import { resetEvent, saveEvent, newEvent, getEvent } from '../store/event/eventSlice';
import reducer from '../store';
import Card from '@material-ui/core/Card';
import Header from 'app/fuse-layouts/shared-components/Header';
import { useAlert } from 'react-alert';
import clsx from 'clsx';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles(theme => ({
	productImageFeaturedStar: {
		position: 'absolute',
		top: 0,
		right: 0,
		color: orange[400],
		opacity: 0
	}
}));

function EventForm(props) {
	const alert = useAlert();
	const dispatch = useDispatch();
	const event = useSelector(({ app }) => app.event);
	const pageLayout = useRef(null);
	const [noEvent, setNoEvent] = useState(false);
	const { form, handleChange, setForm, setInForm } = useForm(null);
	const routeParams = useParams();
	const classes = useStyles(props);

	useDeepCompareEffect(() => {
		function updateEventState() {
			const { eventId } = routeParams;

			if (eventId === 'add') {
				dispatch(newEvent());
			} else {
				dispatch(getEvent(routeParams)).then(action => {
					if (!action.payload) {
						setNoEvent(true);
					}
				});
			}
		}

		updateEventState();
	}, [dispatch, routeParams]);

	useEffect(() => {
		if ((event && !form) || (event && form && event._id !== form._id)) {
			setForm(event);
		}
	}, [form, event, setForm]);

	useEffect(() => {
		return () => {
			dispatch(resetEvent());
			setNoEvent(false);
		};
	}, [dispatch]);

	function canBeSubmitted() {
		return form.title.length > 0 && form.image && !_.isEqual(event, form);
	}

	function saveSuccess() {
		alert.success('Saved!');
		props.history.push(`/admin/events`);
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

	if (noEvent) {
		return (
			<FuseAnimate delay={100}>
				<div className="flex flex-col flex-1 items-center justify-center h-full">
					<Typography color="textSecondary" variant="h5">
						There is no such Event!
					</Typography>
				</div>
			</FuseAnimate>
		);
	}

	if ((!event || (event && routeParams.eventId !== event._id)) && routeParams.eventId !== 'add') {
		return <FuseLoading />;
	}

	return (
		form && (
			<FusePageSimple
				classes={{
					content: 'min-h-full',
					header: 'min-h-72 h-72'
				}}
				header={<Header pageLayout={pageLayout} headText="ADD EVENT" backLink="/admin/events" icon="event" />}
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
								label="Location"
								id="location"
								type="location"
								name="location"
								value={form.location}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
							<TextField
								className="mt-8 mb-16"
								label="StartFrom"
								type="date"
								id="startfrom"
								name="startfrom"
								value={form.startfrom}
								onChange={handleChange}
								variant="outlined"
								fullWidth
								InputLabelProps={{
									shrink: true
								}}
							/>
							<TextField
								className="mt-8 mb-16"
								label="EndsOn"
								type="date"
								id="endson"
								name="endson"
								value={form.endson}
								onChange={handleChange}
								variant="outlined"
								fullWidth
								InputLabelProps={{
									shrink: true
								}}
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
								<InputLabel>Status</InputLabel>
								<Select
									label="Status"
									id="active"
									name="active"
									value={form.active || 'true'}
									onChange={handleChange}
								>
									<MenuItem value={true} selected>
										Active
									</MenuItem>
									<MenuItem value={false}>InActive</MenuItem>
								</Select>
							</FormControl>
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
								{form.image && (
									<div
										role="button"
										tabIndex={0}
										className={clsx(
											classes.productImageItem,
											'flex items-center justify-center relative w-128 h-128 rounded-8 mx-8 mb-16 overflow-hidden cursor-pointer outline-none shadow hover:shadow-lg'
										)}
									>
										<img className="max-w-none w-auto h-full" src={form.image} alt="product" />
									</div>
								)}
							</div>

							<FuseAnimate animation="transition.slideLeftIn" delay={300}>
								<Button
									className="whitespace-nowrap"
									variant="contained"
									color="secondary"
									// disabled={!canBeSubmitted()}
									onClick={() => dispatch(saveEvent(form)).then(() => saveSuccess())}
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

export default withReducer('app', reducer)(EventForm);
