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
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import reducer from '../store';
import Card from '@material-ui/core/Card';
import { getCustomers, selectCustomers, setCustomersSearchText } from '../store/customer/customersSlice';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Header from 'app/fuse-layouts/shared-components/Header';

function Customer(props) {

	const dispatch = useDispatch();
	const customers = useSelector(selectCustomers);
	const [data, setData] = useState(customers)
	const searchText = useSelector(({ app }) => app.customers.searchText);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const pageLayout = useRef(null);

	useEffect(() => {
		dispatch(getCustomers()).then(() => setLoading(false));
	}, [dispatch]);

	useEffect(() => {
		if (searchText.length !== 0) {
			setData(_.filter(customers, item => {
				const {firstName, lastName, email, phone } = item;
				return [firstName, lastName, email, phone].join(',').toLowerCase().includes(searchText.toLowerCase());
			}));
			setPage(0);
		} else {
			setData(customers);
		}
	}, [customers, searchText]);

	const handleChangePage = (event, newPage) => {
	  setPage(newPage);
	};



	function handleClick(item) {
		props.history.push(`/admin/customer/${item._id}`);
	}
  
	function changeSearch(ev) {
		dispatch(setCustomersSearchText(ev))
	}

	const handleChangeRowsPerPage = (event) => {
	  setRowsPerPage(+event.target.value);
	  setPage(0);
	};

	const columns = [
		{ id: 'name', label: 'NAME', width: 100 },
		{ id: 'phone', label: 'PHONE', width: 90 },
		{ id: 'email', label: 'EMAIL', width: 100 },
		{ id: 'isAdmin', label: 'ADMIN', width: 50 },
	];
	
	const useStyles = makeStyles({
		root: {
		  width: '100%',
		},
		container: {
		  maxHeight: 440,
		},
	  });
	 
	if (loading) {
		return <FuseLoading />;
	}
		
	return (
		<FusePageSimple
			classes={{
				header: 'min-h-72 h-72'
			}}
			header={<Header pageLayout={pageLayout}  icon="people_alt" headText="ALL CUSTOMERS" addLink="/admin/customer/add" handleSearch={(ev) => changeSearch(ev)} />}
			content={
				data.length === 0?
					<FuseAnimate delay={100}>
						<div className="flex flex-1 items-center justify-center h-full">
							<Typography color="textSecondary" variant="h5">
								There are no customers!
							</Typography>
						</div>
					</FuseAnimate>
					:	
					<Card className="mx-16 my-16 tableHead-customer">
						<TableContainer className={useStyles.container}>
							<Table stickyHeader aria-label="sticky table">
							<TableHead>
							<TableRow>
								{columns.map((column) => (
								<TableCell
									key={column.id}
									align={column.align}
									style={{ minWidth: column.width }}
								>
									{column.label}
								</TableCell>
								))}
							</TableRow>
							</TableHead>
							<TableBody>
							{
							data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
								return (
								<TableRow hover role="checkbox"
									tabIndex={-1}
									key={row._id}
									onClick={event => handleClick(row)}
								>
										{columns.map((column) => {
										const value = row[column.id];
										return column.id === 'name' ? 
											(<TableCell key={column.id} align={column.align}>
													{row.firstName} {row.lastName}
												</TableCell>) :
											(<TableCell key={column.id} align={column.align}>
												{typeof value == 'boolean' ? (value ? (
													<Icon className="text-green text-20">check_circle</Icon>
												) : (
													<Icon className="text-red text-20">remove_circle</Icon>
												)) : value}
											</TableCell>);
										
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
			}
			ref={pageLayout}
		/>
	  );
}

export default withReducer('app', reducer)(Customer);
