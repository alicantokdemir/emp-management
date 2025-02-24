import {LitElement, html, css} from 'lit';
import {translate as t} from 'lit-translate';

import '../language-switcher/language-switcher.js';
import Fontawesome from 'lit-fontawesome';

class NavBar extends LitElement {
  static properties = {
    menuActive: {type: Boolean},
  };

  static styles = [
    Fontawesome,
    css`
      :host {
        display: block;
        background-color: #fff;
        color: var(--primary-color);
        padding: 1rem;
      }
      nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
      }
      .menu {
      }
      .menu.active {
        transform: translateX(0);
        box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
      }
      .hamburger {
        display: none;
        cursor: pointer;
      }
      ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        align-items: center;
      }
      li {
        margin: 0 1rem;
      }
      a {
        color: var(--primary-color);
        text-decoration: none;
      }
      a:hover {
        text-decoration: underline;
      }
      @media (max-width: 768px) {
        ul {
          display: none;
        }
        .hamburger {
          display: block;
        }
        .menu {
          display: flex;

          flex-direction: column;
          position: fixed;
          top: 0;
          right: 0;
          height: 100%;
          width: 250px;
          background-color: #fff;
          transform: translateX(100%);
          transition: transform 0.3s ease;
          z-index: 1000;
        }
        .menu li {
          margin: 1rem 0;
          padding: 1.5rem;
          font-size: 1.5rem;
        }
        .menu a {
          display: block;
          width: 100%;
          text-align: center;
        }
      }
    `,
  ];

  constructor() {
    super();
    this.menuActive = false;
  }

  toggleMenu() {
    this.menuActive = !this.menuActive;
  }

  render() {
    return html`
      <nav>
        <div class="logo">MyApp</div>

        <div class="hamburger" @click="${this.toggleMenu}">
          <i class="fas fa-bars"></i>
        </div>
        <ul class="menu ${this.menuActive ? 'active' : ''}">
          <li>
            <a href="/employees"
              ><i class="fas fa-user"></i> ${t('Navbar.Employees')}</a
            >
          </li>
          <li>
            <a href="/employees/add"
              ><i class="fas fa-plus"></i> ${t('Navbar.Add New')}</a
            >
          </li>
          <li>
            <language-switcher></language-switcher>
          </li>
          ${this.menuActive
            ? html`
                <li>
                  <div class="hamburger" @click="${this.toggleMenu}">
                    <i class="fas fa-times"></i>
                  </div>
                </li>
              `
            : ''}
        </ul>
      </nav>
    `;
  }
}

customElements.define('app-navbar', NavBar);
