import {fixture, html, expect} from '@open-wc/testing';
import './navbar.js';

describe('NavBar', () => {
  let element;

  beforeEach(async () => {
    element = await fixture(html`<app-navbar></app-navbar>`);
  });

  it('renders a nav element', () => {
    const nav = element.shadowRoot.querySelector('nav');
    expect(nav).to.exist;
  });

  it('renders a logo', () => {
    const logo = element.shadowRoot.querySelector('.logo');
    expect(logo).to.exist;
    expect(logo.textContent).to.equal('MyApp');
  });

  it('toggles menu on hamburger click', async () => {
    const hamburger = element.shadowRoot.querySelector('.hamburger');
    hamburger.click();
    await element.updateComplete;
    const menu = element.shadowRoot.querySelector('.menu');
    expect(menu.classList.contains('active')).to.be.true;

    hamburger.click();
    await element.updateComplete;
    expect(menu.classList.contains('active')).to.be.false;
  });

  it('renders menu items', () => {
    const menuItems = element.shadowRoot.querySelectorAll('ul.menu li');
    expect(menuItems.length).to.equal(3);
  });

  it('renders language switcher', () => {
    const languageSwitcher =
      element.shadowRoot.querySelector('language-switcher');
    expect(languageSwitcher).to.exist;
  });
});
