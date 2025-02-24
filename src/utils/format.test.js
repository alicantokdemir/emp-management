import {expect} from '@open-wc/testing';
import {formatPhoneNumber, formatDate} from './format';

describe('formatPhoneNumber', () => {
  it('should format phone number correctly', () => {
    expect(formatPhoneNumber('905321234567')).to.equal('+(90) 532 123 45 67');
  });

  it('should return empty string for empty input', () => {
    expect(formatPhoneNumber('')).to.equal('');
  });
});

describe('formatDate', () => {
  it('should format date correctly', () => {
    expect(formatDate('2023-10-05')).to.equal('05/10/2023');
  });

  it('should return empty string for empty input', () => {
    expect(formatDate('')).to.equal('undefined/undefined/');
  });
});
