import { buildTallyUrl, TALLY_FORM_URL } from '../utils/tallyUrl';

describe('buildTallyUrl', () => {
  it('returns the base URL when search is empty', () => {
    expect(buildTallyUrl()).toBe(TALLY_FORM_URL);
    expect(buildTallyUrl('')).toBe(TALLY_FORM_URL);
    expect(buildTallyUrl('?')).toBe(TALLY_FORM_URL);
  });

  it('appends utm_source, utm_medium and utm_campaign', () => {
    expect(
      buildTallyUrl('?utm_source=instagram&utm_medium=bio&utm_campaign=mvp_validacao'),
    ).toBe(`${TALLY_FORM_URL}?utm_source=instagram&utm_medium=bio&utm_campaign=mvp_validacao`);
  });

  it('works when search starts with a question mark', () => {
    expect(buildTallyUrl('?utm_source=instagram')).toBe(
      `${TALLY_FORM_URL}?utm_source=instagram`,
    );
  });

  it('works when search does not start with a question mark', () => {
    expect(buildTallyUrl('utm_source=instagram')).toBe(`${TALLY_FORM_URL}?utm_source=instagram`);
  });

  it('preserves multiple arbitrary params', () => {
    expect(buildTallyUrl('?ref=abc&coupon=noivas2026&debug=true')).toBe(
      `${TALLY_FORM_URL}?ref=abc&coupon=noivas2026&debug=true`,
    );
  });
});
