import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store';
import ContactHeader from './ContactHeader';
import ContactsTable from './ContactsTable';

function Contacts() {
	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				contentCard: 'overflow-hidden',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={<ContactHeader />}
			content={<ContactsTable />}
			innerScroll
		/>
	);
}

export default withReducer('app', reducer)(Contacts);
