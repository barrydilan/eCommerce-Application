import { IFormData } from './interfaces.ts';

export type UpdateDataCallBack = (prevState: IFormData) => IFormData;

export type UpdateDataFields = Partial<IFormData>;

export type UpdateDataParams = UpdateDataFields | UpdateDataCallBack;

export type UserFormProps = Partial<IFormData> & {
	updateData: (fieldsOrCallback: UpdateDataParams) => void;
	enableNext: (arg: boolean) => void;
};

export type PropsType = {
	backFunc: () => void;
	nextFunc: () => void;
	isNextEnabled: boolean;
	isFirstStep: boolean;
	isLoading: boolean;
};
