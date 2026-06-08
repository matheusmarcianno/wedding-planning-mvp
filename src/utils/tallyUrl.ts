import { TALLY_FORM_URL } from '../constants/landing';

export { TALLY_FORM_URL };

export function buildTallyUrl(search?: string): string {
  const normalizedSearch = search?.trim();

  if (!normalizedSearch) {
    return TALLY_FORM_URL;
  }

  const queryParams = normalizedSearch.startsWith('?')
    ? normalizedSearch.slice(1)
    : normalizedSearch;

  if (!queryParams) {
    return TALLY_FORM_URL;
  }

  return `${TALLY_FORM_URL}?${queryParams}`;
}
