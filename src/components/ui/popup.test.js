import {html, fixture, expect} from '@open-wc/testing';
import sinon from 'sinon';
import './popup.js';

describe('PopupComponent', () => {
  it('should be hidden by default', async () => {
    const el = await fixture(html`<app-popup></app-popup>`);
    const overlay = el.shadowRoot.querySelector('.overlay');
    expect(overlay.classList.contains('show')).to.be.false;
  });

  it('should display the title and content', async () => {
    const el = await fixture(
      html`<app-popup title="Test Title" content="Test Content"></app-popup>`
    );
    const title = el.shadowRoot.querySelector('h3');
    const content = el.shadowRoot.querySelector('p');
    expect(title.textContent).to.equal('Test Title');
    expect(content.textContent).to.equal('Test Content');
  });

  it('should show the popup when open is true', async () => {
    const el = await fixture(html`<app-popup open></app-popup>`);
    const overlay = el.shadowRoot.querySelector('.overlay');
    expect(overlay.classList.contains('show')).to.be.true;
  });

  it('should call onProceed and close the popup when proceed button is clicked', async () => {
    const onProceed = sinon.spy();
    const el = await fixture(
      html`<app-popup .onProceed=${onProceed} open></app-popup>`
    );
    const proceedBtn = el.shadowRoot.querySelector('.proceed-btn');
    proceedBtn.dispatchEvent(new Event('button-click'));
    await el.updateComplete;
    expect(onProceed.calledOnce).to.be.true;
    expect(el.open).to.be.false;
  });

  it('should close the popup when cancel button is clicked', async () => {
    const el = await fixture(html`<app-popup open></app-popup>`);
    const cancelBtn = el.shadowRoot.querySelector('.cancel-btn');
    cancelBtn.dispatchEvent(new Event('button-click'));
    await el.updateComplete;
    expect(el.open).to.be.false;
  });

  it('should close the popup when close icon is clicked', async () => {
    const el = await fixture(html`<app-popup open></app-popup>`);
    const closeIcon = el.shadowRoot.querySelector('.close-btn');
    closeIcon.click();
    await el.updateComplete;
    expect(el.open).to.be.false;
  });

  it('should stop propagation of click events inside the popup', async () => {
    const el = await fixture(html`<app-popup open></app-popup>`);
    const popup = el.shadowRoot.querySelector('.popup');
    const event = new Event('click', {bubbles: true, cancelable: true});
    const stopPropagationSpy = sinon.spy(event, 'stopPropagation');
    popup.dispatchEvent(event);
    expect(stopPropagationSpy.calledOnce).to.be.true;
  });
});
