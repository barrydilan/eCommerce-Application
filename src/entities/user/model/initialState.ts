interface IInitialState {
	accessToken: string;
	isLogged: boolean;
}

const initialState: IInitialState = {
	accessToken: '',
	isLogged: false,
};

export default initialState;
