import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import initialState from './initialState.ts';
import { ILoginUserDataResponse } from '../../../shared/types';

interface ILoggedInPayload {
	accessToken: string;
	userLoggedInData: ILoginUserDataResponse;
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		updateAccessToken: (state, action: PayloadAction<string>) => {
			state.accessToken = action.payload;
		},

		loggedIn: (state, action: PayloadAction<ILoggedInPayload>) => {
			const { accessToken, userLoggedInData } = action.payload;

			state.isLogged = true;
			state.accessToken = accessToken;
			state.userData = userLoggedInData;
		},

		loggedOut: (_, action: PayloadAction<string>) => ({ ...initialState, accessToken: action.payload }),
	},
});

export const userReducer = userSlice.reducer;
