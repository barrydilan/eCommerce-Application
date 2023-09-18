import { createApi } from '@reduxjs/toolkit/query/react';

import baseQueryWithReauth from './baseQueryWithReauth.ts';

const rootApi = createApi({
	reducerPath: 'rootApi',
	tagTypes: ['CartItems'],
	baseQuery: baseQueryWithReauth,
	endpoints: () => ({}),
});

export default rootApi;
