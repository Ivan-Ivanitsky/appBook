import { Abstract } from "../../common/views";
import { Header } from "../header/header";
import { CardsList } from "../booksList/cardsList";
import onChange from "on-change";
export class Favorites extends Abstract {
  constructor(appState) {
    super();
    this.appState = appState;
    this.appState = onChange(this.appState, this.appStateHook.bind(this));
    this.setTitle("Избранное");
  }

  appStateHook(path) {
    if (path === "favorites") {
      this.render();
    }
  }

  render() {
    const main = document.createElement("div");
    main.classList.add("books__count");
    main.innerHTML = `
    <div>
        Избранные книги - ${this.appState.favorites.length}
    </div>`;
    this.app.innerHTML = "";
    this.app.append(main);
    this.app.append(
      new CardsList(this.appState, { list: this.appState.favorites }).render()
    );
    this.headerRender(); // рендер Header компонента
  }

  headerRender() {
    const header = new Header(this.appState).render();
    this.app.prepend(header);
  }
}
