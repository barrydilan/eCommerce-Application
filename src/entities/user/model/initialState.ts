interface IInitialState {
	accessToken: string;
	isLogged: boolean;
	userId: string;
}

const initialState: IInitialState = {
	accessToken: '',
	isLogged: false,
	userId: '',
};

export default initialState;
