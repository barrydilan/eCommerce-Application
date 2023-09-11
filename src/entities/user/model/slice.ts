import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import initialState from './initialState.ts';

interface ILoggedInPayload {
	accessToken: string;
	userId: string;
	refreshToken: string;
}

type IUpdateAccessTokenPayload = Omit<ILoggedInPayload, 'userId'>;

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		updateAccessToken: (state, action: PayloadAction<IUpdateAccessTokenPayload>) => {
			const { accessToken, refreshToken } = action.payload;

			state.accessToken = accessToken;
			state.refreshToken = refreshToken;
		},

		loggedIn: (state, action: PayloadAction<ILoggedInPayload>) => {
			const { accessToken, userId, refreshToken } = action.payload;

			state.isLogged = true;
			state.accessToken = accessToken;
			state.userId = userId;
			state.refreshToken = refreshToken;
		},

		loggedOut: () => initialState,
	},
});

export const userReducer = userSlice.reducer;