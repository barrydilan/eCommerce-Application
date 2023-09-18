import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import initialState from './initialState.ts';

interface ILoggedInPayload {
	accessToken: string;
	userId: string;
	refreshToken: string;
	cartId: string;
}

interface IUpdateAccessTokenPayload extends Omit<ILoggedInPayload, 'userId'> {
	cartId: string;
}

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
			const { accessToken, userId, refreshToken, cartId } = action.payload;

			state.isLogged = true;
			state.accessToken = accessToken;
			state.userId = userId;
			state.refreshToken = refreshToken;
			state.cartId = cartId;
		},

		loggedOut: () => initialState,

		updateCartId: (state, action: PayloadAction<string>) => {
			state.cartId = action.payload;
		},
	},
});

export const userReducer = userSlice.reducer;
