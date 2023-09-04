import { DivComponent } from "../../common/divComponent";
import "./header.css";

export class Header extends DivComponent {
  constructor(appState) {
    super();
    this.appState = appState;
  }

  render() {
    this.el.innerHTML = "";
    this.el.classList.add("header");
    this.el.innerHTML = `
    <div class ='header__logo'>
      <a class='logo' href="">
          <img src="./static/Logo.svg" alt="Logo" />
      </a>
    </div>
    <div class='header__links'>
        <a class = 'menu__link' href='#search'>
            <img src="./static/search.svg" alt="search" />
            Поиск книг
        </a>
        <a class = 'menu__link' href='#favorites'>
            <img src="./static/favorites.svg" alt="favorites" />
            Избранное
        </a>
        <div  class='menu__counter'>
            ${this.appState.favorites.length}
        </div>
    </div>
    `;
    const hash = location.hash;
    if (hash) {
      const el = this.el.querySelector(`a[href="${hash}"]`);
      el.classList.add("menu__link_active");
    }
    return this.el;
  }
}
