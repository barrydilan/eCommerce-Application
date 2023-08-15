import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import initialState from './initialState.ts';

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		updateAccessToken: (state, action: PayloadAction<string>) => {
			state.accessToken = action.payload;
		},

		loggedIn: (state, action: PayloadAction<string>) => {
			state.isLogged = true;
			state.accessToken = action.payload;
		},

		loggedOut: () => initialState,
	},
});

export const userReducer = userSlice.reducer;
