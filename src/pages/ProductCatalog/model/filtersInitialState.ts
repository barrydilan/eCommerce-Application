export type FiltersFields = {
	vegan: boolean;
	spicy: boolean;
	promo: boolean;
	price: string;
	calories: string;
	weight: string;
	categoryId: string;
};

export const filtersInitialState: FiltersFields = {
	vegan: false,
	spicy: false,
	promo: false,
	price: '',
	calories: '',
	weight: '',
	categoryId: '',
};
