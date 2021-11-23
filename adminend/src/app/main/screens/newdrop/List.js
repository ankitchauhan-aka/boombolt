import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';
import _ from '@lodash';
import Icon from '@material-ui/core/Icon';
import React, { useEffect, useRef, useState } from 'react';
import withReducer from 'app/store/withReducer';
import { makeStyles } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';
import { useDispatch, useSelector } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import reducer from '../store';
import Card from '@material-ui/core/Card';
import { getNewDrops, selectNewDrops, setBannersSearchText } from '../store/newdrop/newdropsSlice';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Header from 'app/fuse-layouts/shared-components/Header';

function NewDrop(props) {
	const dispatch = useDispatch();
	const newdrops = useSelector(selectNewDrops);
	const [data, setData] = useState(newdrops);
	const searchText = useSelector(({ app }) => app.banners.searchText);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const pageLayout = useRef(null);

	useEffect(() => {
		dispatch(getNewDrops()).then(() => setLoading(false));
	}, [dispatch]);

	useEffect(() => {
		if (searchText.length !== 0) {
			setData(
				_.filter(newdrops, item =>
					[item.title, item.desc].join(' ').toLowerCase().includes(searchText.toLowerCase())
				)
			);
			setPage(0);
		} else {
			setData(newdrops);
		}
	}, [newdrops, searchText]);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	function handleClick(item) {
		props.history.push(`/admin/newdrop/${item._id}`);
	}

	function changeSearch(ev) {
		dispatch(setBannersSearchText(ev));
	}

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const columns = [
		{ id: 'title', label: 'TITLE', width: 120 },
		{ id: 'logo', label: 'LOGO', width: 120 },
		{ id: 'backimage', label: 'BACK IMAGE', width: 120 },
		{ id: 'categories', label: 'CATEGORY', width: 120 }
	];

	const useStyles = makeStyles({
		root: {
			width: '100%'
		},
		container: {
			maxHeight: 440
		}
	});

	if (loading) {
		return <FuseLoading />;
	}

	return (
		<FusePageSimple
			classes={{
				content: 'min-h-full',
				header: 'min-h-72 h-72'
			}}
			header={
				<Header
					pageLayout={pageLayout}
					icon="view_carousel"
					headText="ALL NEWDROP"
					addLink="/admin/newdrop/add"
					handleSearch={ev => changeSearch(ev)}
				/>
			}
			content={
				data.length === 0 ? (
					<FuseAnimate delay={100}>
						<div className="flex flex-1 items-center justify-center h-full">
							<Typography color="textSecondary" variant="h5">
								There are no New Drop!
							</Typography>
						</div>
					</FuseAnimate>
				) : (
					<Card className="mx-16 my-16 tableHead-newDrop">
						<TableContainer className={useStyles.container}>
							<Table stickyHeader aria-label="sticky table">
								<TableHead>
									<TableRow>
										{columns.map(column => (
											<TableCell
												key={column.id}
												align={column.align}
												style={{ minWidth: column.width }}
												className="brands-table-head"
											>
												{column.label}
											</TableCell>
										))}
									</TableRow>
								</TableHead>
								<TableBody>
									{data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
										return (
											<TableRow
												hover
												role="checkbox"
												tabIndex={-1}
												key={row._id}
												onClick={event => handleClick(row)}
											>
												{columns.map(column => {
													const value = row[column.id];
													return column.id === 'backimage' ||
														column.id === 'logo' ||
														column.id === 'categories' ? (
														column.id != 'categories' ? (
															<TableCell key={column.id} align={column.align} className="brands-table-head">
																<img src={value} height="100px" width="100px" />
															</TableCell>
														) : (
															<TableCell
																className="p-4 md:p-16 truncate"
																component="th"
																scope="row"
																className="brands-table-head"
															>
																{value?.map(data => data.slug)},
															</TableCell>
														)
													) : (
														<TableCell key={column.id} align={column.align} className="brands-table-head">
															{typeof value == 'boolean' ? (
																value ? (
																	<Icon className="text-green text-20">
																		check_circle
																	</Icon>
																) : (
																	<Icon className="text-red text-20">
																		remove_circle
																	</Icon>
																)
															) : (
																value
															)}
														</TableCell>
													);
												})}
											</TableRow>
										);
									})}
								</TableBody>
							</Table>
						</TableContainer>
						<TablePagination
							rowsPerPageOptions={[10, 25, 100]}
							component="div"
							count={data.length}
							rowsPerPage={rowsPerPage}
							page={page}
							onChangePage={handleChangePage}
							onChangeRowsPerPage={handleChangeRowsPerPage}
						/>
					</Card>
				)
			}
			ref={pageLayout}
			innerScroll
		/>
	);
}

export default withReducer('app', reducer)(NewDrop);
