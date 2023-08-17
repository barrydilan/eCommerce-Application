import { ILoginUserDataResponse } from '../../../shared/types';

interface IInitialState {
	accessToken: string;
	isLogged: boolean;
	userData: ILoginUserDataResponse;
}

const initialState: IInitialState = {
	accessToken: '',
	isLogged: false,
	userData: {} as ILoginUserDataResponse,
};

export default initialState;
