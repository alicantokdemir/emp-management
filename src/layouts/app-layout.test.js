import {fixture, html, expect} from '@open-wc/testing';
import './app-layout.js';

describe('AppLayout', () => {
  it('should render the navbar', async () => {
    const el = await fixture(html`<app-layout></app-layout>`);
    const navbar = el.shadowRoot.querySelector('app-navbar');
    expect(navbar).to.exist;
  });

  it('should render the popup', async () => {
    const el = await fixture(html`<app-layout></app-layout>`);
    const popup = el.shadowRoot.querySelector('app-popup');
    expect(popup).to.exist;
  });

  it('should render the title slot', async () => {
    const el = await fixture(
      html`<app-layout><span slot="title">Test Title</span></app-layout>`
    );
    const titleSlot = el.shadowRoot.querySelector('slot[name="title"]');
    expect(titleSlot).to.exist;
    const assignedNodes = titleSlot.assignedNodes();
    expect(assignedNodes[0].textContent).to.equal('Test Title');
  });

  it('should render the actions slot', async () => {
    const el = await fixture(
      html`<app-layout><span slot="actions">Test Actions</span></app-layout>`
    );
    const actionsSlot = el.shadowRoot.querySelector('slot[name="actions"]');
    expect(actionsSlot).to.exist;
    const assignedNodes = actionsSlot.assignedNodes();
    expect(assignedNodes[0].textContent).to.equal('Test Actions');
  });

  it('should render the content slot', async () => {
    const el = await fixture(
      html`<app-layout><div slot="content">Test Content</div></app-layout>`
    );
    const contentSlot = el.shadowRoot.querySelector('slot[name="content"]');
    expect(contentSlot).to.exist;
    const assignedNodes = contentSlot.assignedNodes();
    expect(assignedNodes[0].textContent).to.equal('Test Content');
  });
});
