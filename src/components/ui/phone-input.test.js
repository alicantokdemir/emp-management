import {fixture, html, expect} from '@open-wc/testing';
import './phone-input.js';

describe.only('PhoneInput', () => {
  it('should render the phone input field', async () => {
    const el = await fixture(html`<phone-input></phone-input>`);
    const input = el.shadowRoot.querySelector('#phone');
    expect(input).to.exist;
  });

  it('should have the correct placeholder', async () => {
    const el = await fixture(html`<phone-input></phone-input>`);
    const input = el.shadowRoot.querySelector('#phone');
    expect(input.placeholder).to.equal('+(90) ___ ___ __ __');
  });

  it('should dispatch phone-changed event on input', async () => {
    const el = await fixture(html`<phone-input></phone-input>`);
    const input = el.shadowRoot.querySelector('#phone');
    setTimeout(() => (input.value = '1234567890'));
    input.dispatchEvent(new Event('input'));
    el.addEventListener('phone-changed', (e) => {
      expect(e.detail).to.equal('1234567890');
    });
  });

  it('should apply IMask to the input field', async () => {
    const el = await fixture(html`<phone-input></phone-input>`);
    const input = el.shadowRoot.querySelector('#phone');
    expect(el.phoneMask).to.exist;
    expect(el.phoneMask.masked.value).to.equal('+(90) ');
  });

  it('should set the name property', async () => {
    const el = await fixture(
      html`<phone-input name="phone-test"></phone-input>`
    );
    expect(el.name).to.equal('phone-test');
  });

  it('should set the value property', async () => {
    const el = await fixture(
      html`<phone-input value="1234567890"></phone-input>`
    );
    const input = el.shadowRoot.querySelector('#phone');
    expect(input.value).to.equal('+(90) 123 456 78 90');
  });
});
