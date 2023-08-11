import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { authApi, productApi } from '../../shared/api';

const rootReducer = combineReducers({
	[authApi.reducerPath]: authApi.reducer,
	[productApi.reducerPath]: productApi.reducer,
});

export const setupStore = () =>
	configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) => {
			return getDefaultMiddleware().concat(productApi.middleware).concat(authApi.middleware);
		},
	});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
