import {html, fixture, expect, oneEvent} from '@open-wc/testing';
import './button.js';

describe('Button Component', () => {
  it('should render the button', async () => {
    const el = await fixture(html`<app-button></app-button>`);
    expect(el).shadowDom.to.equal(
      '<button class="app-button" type="button"><slot></slot></button>'
    );
  });

  it('should have a default type button', async () => {
    const el = await fixture(html`<app-button></app-button>`);
    expect(el.shadowRoot.querySelector('button').type).to.equal('button');
  });

  it('should accept a className attribute', async () => {
    const el = await fixture(
      html`<app-button className="primary"></app-button>`
    );
    expect(
      Array.from(el.shadowRoot.querySelector('button').classList)
    ).to.contain('primary');
  });

  it('should emit a custom event on click', async () => {
    const el = await fixture(html`<app-button></app-button>`);
    setTimeout(() => el.shadowRoot.querySelector('button').click());
    const event = await oneEvent(el, 'button-click');
    expect(event).to.exist;
  });

  it('should emit a submit event on click if submit button', async () => {
    const el = await fixture(
      html`<form><app-button type="submit"></app-button></form>`
    );
    setTimeout(() =>
      el.querySelector('app-button').shadowRoot.querySelector('button').click()
    );
    const event = await oneEvent(el, 'submit');
    expect(event).to.exist;
  });
});
