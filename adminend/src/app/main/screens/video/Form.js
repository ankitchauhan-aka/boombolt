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
import { resetVideo, saveVideo, newVideo, getVideo } from '../store/video/videoSlice';
import reducer from '../store';
import Card from '@material-ui/core/Card';
import Header from 'app/fuse-layouts/shared-components/Header';
import { useAlert } from 'react-alert';
import clsx from 'clsx';
import Icon from '@material-ui/core/Icon';
import { Upload } from "antd";
import "antd/dist/antd.css";

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

function VideoForm(props) {
	const alert = useAlert();
	const Dragger = Upload.Dragger;
	const dispatch = useDispatch();
	const video = useSelector(({ app }) => app.video);
	const pageLayout = useRef(null);
	const [noVideo, setNoVideo] = useState(false);
	const { form, handleChange, setForm, setInForm } = useForm(null);
	const routeParams = useParams();
	const classes = useStyles(props);


	useDeepCompareEffect(() => {
		function updateVideoState() {
			const { videoId } = routeParams;

			if (videoId === 'add') {
				dispatch(newVideo());
			} else {
				dispatch(getVideo(routeParams)).then(action => {
					if (!action.payload) {
						setNoVideo(true);
					}
				});
			}
		}

		updateVideoState();
	}, [dispatch, routeParams]);

	useEffect(() => {
		if ((video && !form) || (video && form && video._id !== form._id)) {
			setForm(video);
		}
	}, [form, video, setForm]);

	useEffect(() => {
		return () => {
			dispatch(resetVideo());
			setNoVideo(false);
		};
	}, [dispatch]);

	function canBeSubmitted() {
		return form.title.length > 0 && form.mp4file && !_.isEqual(video, form);
	}

	function saveSuccess() {
		alert.success('Saved!');
		props.history.push(`/admin/videos`);
	}
	function handleUploadChange(e) {
		const file = e.target.files[0];
		if (!file) {
			return;
		}
		const reader = new FileReader();
		reader.readAsBinaryString(file);

		reader.onload = () => {
			setForm(_.set({ ...form }, `mp4file`, `data:${file.type};base64,${btoa(reader.result)}`))
		};


		reader.onerror = () => {
			console.log('error on load video');
		};
	}

	function handleImageUploadChange(e) {
		const image = e.target.files[0];

		if (!image) {
			return;
		}
		const reader = new FileReader();
		reader.readAsBinaryString(image);

		reader.onload = () => {
			setForm(_.set({ ...form }, `image`, `data:${image.type};base64,${btoa(reader.result)}`))
		};
		reader.onerror = () => {
			console.log('error on load image');
		};
	}


	if (noVideo) {
		return (
			<FuseAnimate delay={100}>
				<div className="flex flex-col flex-1 items-center justify-center h-full">
					<Typography color="textSecondary" variant="h5">
						There is no such Video!
					</Typography>
				</div>
			</FuseAnimate>
		);
	}

	if ((!video || (video && routeParams.videoId !== video._id)) && routeParams.videoId !== 'add') {
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
						headText="ADD VIDEO"
						backLink="/admin/videos"
						icon="featured_video"
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
								label="Link"
								id="link"
								name="link"
								value={form.link}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
							<TextField
								className="mt-8 mb-16"
								label="Short Description"
								id="short_desc"
								name="short_desc"
								value={form.short_desc}
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
							<TextField
								className="mt-8 mb-16"
								label="Index"
								id="index"
								name="index"
								value={form.index}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>

							<div className=" p-5 mb-5 ">
								<p className="bold-text">Uplaod video</p>
							</div>

							<div className="flex justify-center sm:justify-start flex-wrap -mx-8">
								<label

									htmlFor="button-file"
									className={clsx(
										classes.productVideoUpload,
										'flex items-center justify-center relative w-128 h-128 rounded-8 mx-8 mb-16 overflow-hidden cursor-pointer shadow hover:shadow-lg'
									)}
								>
									<input
										accept="video/*"
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
								{form.mp4file && (
									<div

										role="button"
										tabIndex={0}
										className={clsx(
											classes.productVideoItem,
											'flex items-center justify-center relative w-128 h-128 rounded-8 mx-8 mb-16 overflow-hidden cursor-pointer outline-none shadow hover:shadow-lg'
										)}
									>
										<video className="max-w-none w-auto h-full" src={form.mp4file} alt="product" />
									</div>
								)}

							</div>
							<div className=" p-5 mb-5 ">
								<p className="bold-text">Uplaod Image</p>
							</div>

							<div className="flex justify-center sm:justify-start flex-wrap -mx-8">
								<label
									htmlFor="button-image"
									className={clsx(
										classes.productImageUpload,
										'flex items-center justify-center relative w-128 h-128 rounded-8 mx-8 mb-16 overflow-hidden cursor-pointer shadow hover:shadow-lg'
									)}
								>
									<input
										accept="image/*"
										required
										className="hidden"
										id="button-image"
										type="file"
										onChange={handleImageUploadChange}
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
									onClick={() => dispatch(saveVideo(form)).then(() => saveSuccess())}
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

export default withReducer('app', reducer)(VideoForm);
