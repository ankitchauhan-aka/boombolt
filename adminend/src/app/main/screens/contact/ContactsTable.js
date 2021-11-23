import FuseScrollbars from '@fuse/core/FuseScrollbars';
import FuseUtils from '@fuse/utils';
import _ from '@lodash';
import Checkbox from '@material-ui/core/Checkbox';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FuseLoading from '@fuse/core/FuseLoading';
import FuseAnimate from '@fuse/core/FuseAnimate';
// import OrdersStatus from './single/ContactsStatus';
import { selectContacts, getContacts } from '../store/contact/contactsSlice';
import OrdersTableHead from './ContactsTableHead';

function ContactsTable(props) {
	const dispatch = useDispatch();
	const orders = useSelector(selectContacts);
	const searchText = useSelector(({ app }) => app.orders.searchText);

	const [loading, setLoading] = useState(true);
	const [selected, setSelected] = useState([]);
	const [data, setData] = useState(orders);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});
	useEffect(() => {
		dispatch(getContacts()).then(() => setLoading(false));
	}, [dispatch]);
	useEffect(() => {
		if (searchText.length !== 0) {
			setData(orders);
		} else {
			setData(orders);
		}
	}, [orders]);

	useEffect(() => {
		if (searchText.length !== 0) {
			dispatch(getContacts({ page: page + 1, rows: rowsPerPage, keyword: searchText.toLowerCase() }));
		} else {
			setData(orders);
		}
	}, [searchText]);

	function handleRequestSort(event, property) {
		const id = property;
		let direction = 'desc';

		if (order.id === property && order.direction === 'desc') {
			direction = 'asc';
		}

		setOrder({
			direction,
			id
		});
	}

	function handleSelectAllClick(event) {
		if (event.target.checked) {
			setSelected(data[0].orders.map(n => n.id));
			return;
		}
		setSelected([]);
	}

	function handleDeselect() {
		setSelected([]);
	}

	function handleClick(item) {
		props.history.push(`/admin/contactlist/${item._id}`);
	}

	function handleCheck(event, id) {
		const selectedIndex = selected.indexOf(id);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
		}

		setSelected(newSelected);
	}

	function handleChangePage(event, value) {
		setPage(value);
		dispatch(getContacts({ page: value + 1, rows: rowsPerPage, keyword: 'all' }));
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(event.target.value);
		dispatch(getContacts({ page: page + 1, rows: event.target.value, keyword: 'all' }));
	}

	if (loading) {
		return <FuseLoading />;
	}

	if (data[0]?.contacts.length === 0) {
		return (
			<FuseAnimate delay={100}>
				<div className="flex flex-1 items-center justify-center h-full">
					<Typography color="textSecondary" variant="h5">
						There are no orders!
					</Typography>
				</div>
			</FuseAnimate>
		);
	}

	return (
		<div className="w-full flex flex-col">
			<FuseScrollbars className="flex-grow overflow-x-auto">
				<Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
					<OrdersTableHead
						selectedOrderIds={selected}
						order={order}
						onSelectAllClick={handleSelectAllClick}
						onRequestSort={handleRequestSort}
						rowCount={data[0]?.contacts.length}
						onMenuItemClick={handleDeselect}
					/>

					<TableBody>
						{_.orderBy(
							data[0]?.contacts,
							[
								o => {
									switch (order.id) {
										case 'id': {
											return parseInt(o.id, 10);
										}
										case 'customer': {
											return o.user.firstName + ' ' + o.user.lastName;
										}

										case 'status': {
											return o.isPaid;
										}
										default: {
											return o[order.id];
										}
									}
								}
							],
							[order.direction]
						)
							// .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map(n => {
								const isSelected = selected.indexOf(n.id) !== -1;
								return (
									<TableRow
										className="h-64 cursor-pointer"
										hover
										role="checkbox"
										aria-checked={isSelected}
										tabIndex={-1}
										key={n._id}
										selected={isSelected}
										onClick={event => handleClick(n)}
									>
										{/* <TableCell className="w-40 md:w-64 text-center" padding="none">
											<Checkbox
												checked={isSelected}
												onClick={event => event.stopPropagation()}
												onChange={event => handleCheck(event, n.id)}
											/>
										</TableCell> */}

										{/* <TableCell className="p-4 md:p-16" component="th" scope="row">
											{n.isDelivered ? 'Yes' : 'No'}
										</TableCell> */}

										{/* <TableCell className="p-4 md:p-16" component="th" scope="row">
											{n.shippingAddress.city + ', ' + n.shippingAddress.postalCode}
										</TableCell> */}

										<TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
											{`${n.name}`}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row" align="left">
											{n.email}
										</TableCell>

										<TableCell className="p-4 md:p-16" component="th" scope="row" align="left">
											{n.message}
										</TableCell>

										{/* <TableCell className="p-4 md:p-16" component="th" scope="row">
											{n.isPaid ? 'Yes' : 'No'}
										</TableCell> */}

										<TableCell className="p-4 md:p-16" component="th" scope="row">
											{n.createdAt}
										</TableCell>
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</FuseScrollbars>

			<TablePagination
				className="flex-shrink-0 border-t-1"
				component="div"
				count={data[0]?.contacts.length}
				rowsPerPage={rowsPerPage}
				page={page}
				backIconButtonProps={{
					'aria-label': 'Previous Page'
				}}
				nextIconButtonProps={{
					'aria-label': 'Next Page'
				}}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
		</div>
	);
}

export default withRouter(ContactsTable);
