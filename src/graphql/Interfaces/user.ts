export interface ICreateUsernameVariable {
	username: string;
}

export interface ICreateUsernameResult {
	createUsername: {
		success?: boolean;
		error?: string;
	};
}
