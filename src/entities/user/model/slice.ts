import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import initialState from './initialState.ts';

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		updateAccessToken: (state, action: PayloadAction<string>) => {
			state.accessToken = action.payload;
		},
	},
});

export const userReducer = userSlice.reducer;
