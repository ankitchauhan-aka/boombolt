import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store';
import UsersHeader from './UsersHeader';
import UsersTable from './UsersTable';

function Users() {
	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={<UsersHeader />}
			content={<UsersTable />}
			innerScroll
		/>
	);
}

export default withReducer('app', reducer)(Users);
