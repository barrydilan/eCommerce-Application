export interface IInitialState {
	accessToken: string;
	isLogged: boolean;
	userId: string;
	refreshToken: string;
	cartId: string;
}

const initialState: IInitialState = {
	accessToken: '',
	isLogged: false,
	userId: '',
	refreshToken: '',
	cartId: '',
};

export default initialState;
