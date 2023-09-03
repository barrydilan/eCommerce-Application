import { FiltersFields, filtersInitialState } from '../../model/filtersInitialState.ts';

/**
 * Parses the query state from a URL search params object.
 *
 * @param {URLSearchParams} query - The URL search params object to parse.
 * @returns {FiltersFields} - The parsed query state object.
 */
function parseQueryState(query: URLSearchParams): FiltersFields {
	const filters = query.get('filter');
	if (!filters) return filtersInitialState;

	const parsed = Object.fromEntries(
		filters!.split(',').map((elem) => elem.split('_').map((val) => (val === 'true' ? true : val))),
	);

	return { ...filtersInitialState, ...parsed };
}

export default parseQueryState;
