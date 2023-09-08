import baseQuery from './baseQuery.ts';
import { createReauthQuery } from '../lib/helpers';

const baseQueryWithReauth = createReauthQuery(baseQuery);

export default baseQueryWithReauth;
