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
import { resetColor, saveColor, newColor, getColor } from '../store/color/colorSlice';
import reducer from '../store';
import Card from '@material-ui/core/Card';
import Header from 'app/fuse-layouts/shared-components/Header';
import { useAlert } from 'react-alert';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
	palette: {
		primary: {
			light: '#757ce8',
			main: '#3f50b5',
			dark: '#002884',
			contrastText: '#fff'
		},
		secondary: {
			light: '#ff7961',
			main: '#f44336',
			dark: '#ba000d',
			contrastText: '#000'
		}
	}
});
function ColorForm(props) {
	const alert = useAlert();
	const dispatch = useDispatch();
	const color = useSelector(({ app }) => app.color);
	const pageLayout = useRef(null);
	const [noColor, setNoColor] = useState(false);
	const { form, handleChange, setForm, setInForm } = useForm(null);
	const routeParams = useParams();

	useDeepCompareEffect(() => {
		function updateColorState() {
			const { colorId } = routeParams;
			if (colorId === 'add') {
				dispatch(newColor());
				setNoColor(false);
			} else {
				dispatch(getColor(routeParams)).then(action => {
					if (!action.payload) {
						setNoColor(true);
					}
				});
			}
		}

		updateColorState();
	}, [dispatch, routeParams]);

	useEffect(() => {
		if ((color && !form) || (color && form && color._id !== form._id)) {
			setForm(color);
		}
	}, [form, color, setForm]);

	useEffect(() => {
		return () => {
			dispatch(resetColor());
			setNoColor(false);
		};
	}, [dispatch]);

	function canBeSubmitted() {
		return form.title.length > 0 && !_.isEqual(color, form);
	}

	function saveSuccess() {
		alert.success('Saved!');
		props.history.push(`/admin/colors`);
	}

	if (noColor) {
		return (
			<FuseAnimate delay={100}>
				<div className="flex flex-col flex-1 items-center justify-center h-full">
					<Typography color="textSecondary" variant="h5">
						There is no such Color!
					</Typography>
				</div>
			</FuseAnimate>
		);
	}

	if ((!color || (color && routeParams.colorId !== color._id)) && routeParams.colorId !== 'add') {
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
					<Header pageLayout={pageLayout} headText="ADD COLOR" backLink="/admin/colors" icon="color_lens" />
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
								error={form.colorcode === ''}
								required
								label="Color Code"
								placeholder="#000"
								id="colorcode"
								name="colorcode"
								type="text"
								value={form.colorcode}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
							{/* <TextField
								className="mt-8 mb-16"
								error={form.colorcode === ''}
								required
								label="Color Code"
								type="text"
								id="colorcode"
								name="colorcode"
								value={form.colorcode}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/> */}
							<FuseAnimate animation="transition.slideLeftIn" delay={300}>
								<Button
									className="whitespace-nowrap"
									variant="contained"
									color="secondary"
									disabled={!canBeSubmitted()}
									onClick={() => dispatch(saveColor(form)).then(() => saveSuccess())}
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

export default withReducer('app', reducer)(ColorForm);
