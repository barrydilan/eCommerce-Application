import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { userReducer } from '../../entities/user';
import { rootApi, rootAuthApi } from '../../shared/api';

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

const rootReducer = combineReducers({
	[rootApi.reducerPath]: rootApi.reducer,
	[rootAuthApi.reducerPath]: rootAuthApi.reducer,
	userReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) =>
	configureStore({
		preloadedState,
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) => {
			return getDefaultMiddleware().concat(rootApi.middleware).concat(rootAuthApi.middleware);
		},
	});
