import {html, fixture, expect} from '@open-wc/testing';
import './language-switcher.js';
import sinon from 'sinon';

describe('LanguageSwitcher', () => {
  it('should have default languages', async () => {
    const el = await fixture(html`<language-switcher></language-switcher>`);
    expect(el.languages).to.eql(['en', 'tr']);
  });

  it('should set selectedLanguage based on URL path', async () => {
    window.history.pushState({}, '', '/tr/home');
    const el = await fixture(html`<language-switcher></language-switcher>`);
    expect(el.selectedLanguage).to.equal('tr');
  });

  it('should open menu on container click', async () => {
    const el = await fixture(html`<language-switcher></language-switcher>`);
    const container = el.shadowRoot.querySelector(
      '.language-switcher__container'
    );
    container.click();
    expect(el.menuOpen).to.be.true;
  });

  it('should navigate to selected language', async () => {
    const el = await fixture(html`<language-switcher></language-switcher>`);
    const navigateSpy = sinon.spy(el, 'navigate');
    el.navigate('en');
    expect(navigateSpy).to.have.been.calledWith('en');
  });

  it('should render language flags', async () => {
    const el = await fixture(
      html`<language-switcher menuOpen></language-switcher>`
    );
    const flags = el.shadowRoot.querySelectorAll('.menu img');
    expect(flags.length).to.equal(el.languages.length);
  });
});
