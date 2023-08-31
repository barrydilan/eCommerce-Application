import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import initialState from './initialState.ts';

interface ILoggedInPayload {
	accessToken: string;
	userId: string;
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		updateAccessToken: (state, action: PayloadAction<string>) => {
			state.accessToken = action.payload;
		},

		loggedIn: (state, action: PayloadAction<ILoggedInPayload>) => {
			const { accessToken, userId } = action.payload;

			state.isLogged = true;
			state.accessToken = accessToken;
			state.userId = userId;
		},

		loggedOut: () => initialState,
	},
});

export const userReducer = userSlice.reducer;
