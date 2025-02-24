import {fixture, html, expect} from '@open-wc/testing';
import sinon from 'sinon';

import './date-picker.js';

describe('DatePicker', () => {
  it('should render the date picker input', async () => {
    const el = await fixture(html`<date-picker></date-picker>`);
    const input = el.shadowRoot.querySelector('#datepicker-input');
    expect(input).to.exist;
  });

  it('should set the value property', async () => {
    const el = await fixture(
      html`<date-picker value="2023-10-05"></date-picker>`
    );
    const input = el.shadowRoot.querySelector('#datepicker-input');
    expect(input.value).to.equal('05/10/2023');
  });

  it('should dispatch date-changed event on date selection', async () => {
    const el = await fixture(html`<date-picker></date-picker>`);
    const input = el.shadowRoot.querySelector('#datepicker-input');
    input.value = '05/10/2023';
    input.dispatchEvent(new Event('change'));

    el.addEventListener('date-changed', (e) => {
      expect(e.detail).to.equal('2023-10-05');
    });
  });

  it('should open the date picker on icon click', async () => {
    const el = await fixture(html`<date-picker></date-picker>`);
    const icon = el.shadowRoot.querySelector('i');
    const input = el.shadowRoot.querySelector('#datepicker-input');
    const clickSpy = sinon.spy(input, 'click');
    icon.click();
    expect(clickSpy).to.have.been.calledOnce;
  });
});
