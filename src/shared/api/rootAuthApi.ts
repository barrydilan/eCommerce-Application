import { createApi } from '@reduxjs/toolkit/dist/query/react';

import authQuery from './authQuery.ts';

const rootAuthApi = createApi({
	reducerPath: 'rootAuthApi',
	baseQuery: authQuery,
	endpoints: () => ({}),
});

export default rootAuthApi;
