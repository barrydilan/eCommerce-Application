import { FiltersFields } from '../../model/filtersInitialState.ts';

/**
 * Encodes the query state object to a string.
 *
 * @param {URLSearchParams} state - The query state object to be encoded.
 * @returns {string} - The encoded query state string.
 */
function encodeQueryState(state: FiltersFields): string {
	return Object.entries(state)
		.filter(([, val]) => Boolean(val))
		.map((el) => el.join('_'))
		.join(',');
}

export default encodeQueryState;
