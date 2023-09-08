interface IInitialState {
	accessToken: string;
	isLogged: boolean;
	userId: string;
	refreshToken: string;
}

const initialState: IInitialState = {
	accessToken: '',
	isLogged: false,
	userId: '',
	refreshToken: '',
};

export default initialState;
