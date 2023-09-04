export type FiltersFields = {
	isVegan: boolean;
	isSpicy: boolean;
	isPromo: boolean;
	price: string;
	calories: string;
	weight: string;
	categoryId: string;
};

export const filtersInitialState: FiltersFields = {
	isVegan: false,
	isSpicy: false,
	isPromo: false,
	price: '',
	calories: '',
	weight: '',
	categoryId: '',
};
