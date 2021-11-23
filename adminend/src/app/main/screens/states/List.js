import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';
import Icon from '@material-ui/core/Icon';
import _ from '@lodash';
import React, { useEffect, useRef, useState } from 'react';
import withReducer from 'app/store/withReducer';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import reducer from '../store';
import Card from '@material-ui/core/Card';
import { getStates, selectStates, setStatesSearchText } from '../store/state/statesSlice';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Header from 'app/fuse-layouts/shared-components/Header';

function State(props) {
	const dispatch = useDispatch();
	const states = useSelector(selectStates);
	const [data, setData] = useState(states);
	const searchText = useSelector(({ app }) => app.states.searchText);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const pageLayout = useRef(null);

	useEffect(() => {
		dispatch(getStates()).then(() => setLoading(false));
	}, [dispatch]);

	useEffect(() => {
		if (searchText.length !== 0) {
			setData(_.filter(states, item => item.title.toLowerCase().includes(searchText.toLowerCase())));
			setPage(0);
		} else {
			setData(states);
		}
	}, [states, searchText]);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	function handleClick(item) {
		props.history.push(`/admin/states/${item._id}`);
	}

	function changeSearch(ev) {
		dispatch(setStatesSearchText(ev));
	}

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const columns = [
		{ id: 'title', label: 'STATE', width: 100 },
		{ id: 'tax_region', label: 'TAX REGION', width: 100 },
		{ id: 'zipCode', label: 'ZIP CODE', width: 100 },
		{ id: 'shipping_charge', label: 'SHIPPING CHARGE', width: 100 },
		{ id: 'state_rate', label: 'STATE RATE', width: 100 },
		{ id: 'active', label: 'ACTIVE', width: 100 }
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
					icon="branding_watermark"
					headText="ALL STATES"
					addLink="/admin/states/add"
					handleSearch={ev => changeSearch(ev)}
				/>
			}
			content={
				data.length === 0 ? (
					<FuseAnimate delay={100}>
						<div className="flex flex-1 items-center justify-center h-full">
							<Typography color="textSecondary" variant="h5">
								There are no States!
							</Typography>
						</div>
					</FuseAnimate>
				) : (
					<Card className="mx-16 my-16 tableHead-states">
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
													return <TableCell key={column.id} align={column.align} className="brands-table-head">
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

export default withReducer('app', reducer)(State);
