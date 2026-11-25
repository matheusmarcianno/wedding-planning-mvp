export const TALLY_FORM_URL = 'https://tally.so/r/Bz068e';

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
