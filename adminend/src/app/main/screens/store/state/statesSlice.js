import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

const setInterceptors = () => {
	const access_token = localStorage.getItem('userInfo');
	if (access_token) {
		axios.defaults.headers.common.Authorization = `Bearer ${JSON.parse(access_token).token}`;
	}
};
export const getStates = createAsyncThunk('state/getStates', async () => {
	const response = await axios.get('/api/state');
	const data = await response.data;

	return data;
});

const statesAdapter = createEntityAdapter({});

export const { selectAll: selectStates, selectById: selectStateById } = statesAdapter.getSelectors(
	state => state.app.states
);

const statesSlice = createSlice({
	name: 'states',
	initialState: statesAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setStatesSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getStates.fulfilled]: statesAdapter.setAll
	}
});

export const { setStatesSearchText } = statesSlice.actions;

export default statesSlice.reducer;
