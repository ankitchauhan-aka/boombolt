import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import React, { useEffect, useRef, useState } from 'react';
import withReducer from 'app/store/withReducer';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { useDispatch, useSelector } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import reducer from '../store';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Header from 'app/fuse-layouts/shared-components/Header';

import { getHotDeals, selectHotDeals, setHotDealsSearchText } from '../store/hotdeals/hotdealsSlice';
function HotDeal(props) {
	const dispatch = useDispatch();
	const hotdeals = useSelector(selectHotDeals);
	const [data, setData] = useState(hotdeals);
	const searchText = useSelector(({ app }) => app.hotdeals.searchText);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const pageLayout = useRef(null);

	useEffect(() => {
		dispatch(getHotDeals()).then(() => setLoading(false));
	}, [dispatch]);

	useEffect(() => {
		if (searchText.length !== 0) {
			setData(_.filter(hotdeals, item => item.title.toLowerCase().includes(searchText.toLowerCase())));
			setPage(0);
		} else {
			setData(hotdeals);
		}
	}, [hotdeals, searchText]);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	function handleClick(item) {
		props.history.push(`/admin/hotdeal/${item._id}`);
	}

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const columns = [
		{ id: 'fromdate', label: 'FROM DATE', width: 90 },
		{ id: 'categories', label: 'CATEGORY', width: 90 },
		{ id: 'image', label: 'IMAGE', width: 90 },
		{ id: 'todate', label: 'TO DATE', width: 90 },
		{ id: 'active', label: 'ACTIVE', width: 90 },

	];

	function changeSearch(ev) {
		dispatch(setHotDealsSearchText(ev));
	}

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
				// content: 'overflow-hidden',
				header: 'min-h-72 h-72'
			}}
			header={
				<Header
					pageLayout={pageLayout}
					icon="local_offer"
					headText="ALL HOTDEALS"
					addLink={'/admin/hotdeal/add'}
					handleSearch={ev => changeSearch(ev)}
				/>
			}
			content={
				data.length === 0 ? (
					<FuseAnimate delay={100}>
						<div className="flex flex-1 items-center justify-center h-full">
							<Typography color="textSecondary" variant="h5">
								There are no hotdeals!
							</Typography>
						</div>
					</FuseAnimate>
				) : (
					<Card className="mx-16 my-16 tableHead-hotDeal">
						<FuseScrollbars className="flex-grow overflow-x-auto">
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
													className="h-64 cursor-pointer"
													key={row._id}
													onClick={event => handleClick(row)}
												>
													{columns.map(column => {
														const value = row[column.id];

														// if (column.id === 'image') {
														return column.id === 'image' ||
															column.id === 'categories' ? (
															column.id != 'categories' ? (
																<TableCell key={column.id} align={column.align}>
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
						</FuseScrollbars>
						<TablePagination
							rowsPerPageOptions={[10, 25, 100]}
							component="div"
							className="flex-shrink-0 border-t-1"
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
		// innerScroll
		/>
	);
}

export default withReducer('app', reducer)(HotDeal);
