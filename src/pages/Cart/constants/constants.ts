export const initialAnimation = {
	opacity: 0,
	y: '10%',
};

export const animate = {
	opacity: 1,
	y: 0,
};

export const modalInitial = {
	scale: 0,
	opacity: 0,
	y: '-100%',
};

export const modalTransition = {
	type: 'spring',
	stiffness: 760,
	damping: 30,
};

export const modalAnimate = {
	scale: 1,
	opacity: 1,
	y: '50%',
};

export const modalExit = {
	scale: 0,
	opacity: 0,
	y: '-100%',
};
