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
import { resetBagsize, saveBagsize, newBagsize, getBagsize } from '../store/material/materialSlice';
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
function BagsizeForm(props) {
	const alert = useAlert();
	const dispatch = useDispatch();
	const bagsize = useSelector(({ app }) => app.material);
	const pageLayout = useRef(null);
	const [noBagsize, setNoBagsize] = useState(false);
	const { form, handleChange, setForm, setInForm } = useForm(null);
	const routeParams = useParams();

	useDeepCompareEffect(() => {
		function updateBagsizeState() {
			const { bagsizeId } = routeParams;
			if (bagsizeId === 'add') {
				dispatch(newBagsize());
				setNoBagsize(false);
			} else {
				dispatch(getBagsize(routeParams)).then(action => {
					if (!action.payload) {
						setNoBagsize(true);
					}
				});
			}
		}

		updateBagsizeState();
	}, [dispatch, routeParams]);

	useEffect(() => {
		if ((bagsize && !form) || (bagsize && form && bagsize._id !== form._id)) {
			setForm(bagsize);
		}
	}, [form, bagsize, setForm]);

	useEffect(() => {
		return () => {
			dispatch(resetBagsize());
			setNoBagsize(false);
		};
	}, [dispatch]);

	function canBeSubmitted() {
		return form.title.length > 0 && !_.isEqual(bagsize, form);
	}

	function saveSuccess() {
		alert.success('Saved!');
		props.history.push(`/admin/materials`);
	}

	if (noBagsize) {
		return (
			<FuseAnimate delay={100}>
				<div className="flex flex-col flex-1 items-center justify-center h-full">
					<Typography bagsize="textSecondary" variant="h5">
						There is no such Bagsize!
					</Typography>
				</div>
			</FuseAnimate>
		);
	}

	if ((!bagsize || (bagsize && routeParams.bagsizeId !== bagsize._id)) && routeParams.bagsizeId !== 'add') {
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
						headText="ADD MATERIAL"
						backLink="/admin/materials"
						icon="local_offer"
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
							{/* 
							<TextField
								className="mt-8 mb-16"
								error={form.minsize === ''}
								required
								label="Minimum Bagsize"
								id="minsize"
								name="minsize"
								value={form.minsize}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/>
							<TextField
								className="mt-8 mb-16"
								error={form.maxsize === ''}
								required
								label="Maximum Bagsize"
								id="maxsize"
								name="maxsize"
								value={form.maxsize}
								onChange={handleChange}
								variant="outlined"
								fullWidth
							/> */}
							<FuseAnimate animation="transition.slideLeftIn" delay={300}>
								<Button
									className="whitespace-nowrap"
									variant="contained"
									bagsize="secondary"
									disabled={!canBeSubmitted()}
									onClick={() => dispatch(saveBagsize(form)).then(() => saveSuccess())}
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

export default withReducer('app', reducer)(BagsizeForm);
