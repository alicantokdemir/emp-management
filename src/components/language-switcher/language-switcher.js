import {LitElement, html, css} from 'lit';
import {Router} from '@vaadin/router';

class LanguageSwitcher extends LitElement {
  static properties = {
    languages: {type: Array},
    selectedLanguage: {type: String},
    menuOpen: {type: Boolean},
  };

  static styles = css`
    .language-switcher {
      position: relative;
      display: flex;
      align-items: center;
      width: 20px;

      .language-switcher__container {
        display: flex;
        align-items: center;
      }

      img {
        width: 100%;
        cursor: pointer;
      }

      .menu {
        width: 20px;
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        background-color: white;
        border: 1px solid #ddd;
        border-radius: 4px;
        padding: 4px;
        z-index: 1;

        img {
          width: 100%;
          cursor: pointer;
        }
      }
    }
  `;

  constructor() {
    super();
    this.languages = ['en', 'tr'];
    const path = window.location.pathname || '/en';
    this.selectedLanguage = path.split('/')[1];
    this.menuOpen = false;
  }

  navigate(language) {
    const path = window.location.pathname.replace(/^\/(en|tr)/, '');
    Router.go(`/${language}${path}`);
  }

  switchLanguage(e) {
    const language = e.target.value;
    this.navigate(language);
  }

  openMenu() {
    this.menuOpen = true;
  }

  render() {
    return html`
      <div class="language-switcher">
        <div class="language-switcher__container" @click="${this.openMenu}">
          <img
            src="/images/flags/${this.selectedLanguage}.svg"
            alt="${this.selectedLanguage}"
          />
        </div>

        ${this.menuOpen
          ? html`
              <div class="menu">
                ${this.languages.map(
                  (language) => html`
                    <img
                      @click="${() => this.navigate(language)}"
                      src="/images/flags/${language}.svg"
                      alt="${language}"
                    />
                  `
                )}
              </div>
            `
          : ''}
      </div>
    `;
  }
}

customElements.define('language-switcher', LanguageSwitcher);
