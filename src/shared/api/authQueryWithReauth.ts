import authQuery from './authQuery.ts';
import { createReauthQuery } from '../lib/helpers';

const authQueryWithReauth = createReauthQuery(authQuery);

export default authQueryWithReauth;
