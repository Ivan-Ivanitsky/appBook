import { Abstract } from "../../common/views";
import onChange from "on-change";
import { Header } from "../../components/header/header";
import { Search } from "../../components/search/search";
import { CardsList } from "../../components/booksList/cardsList";
import { Paginate } from "../../components/pagination/paginate";
export class VievMain extends Abstract {
  state = {
    list: [],
    numFound: 0,
    loading: false,
    search: undefined,
    offset: 0,
  };
  constructor(appState) {
    super();
    this.appState = appState;
    this.appState = onChange(this.appState, this.appStateHook.bind(this));
    this.state = onChange(this.state, this.stateHook.bind(this));
    this.setTitle("Поиск книг");
  }

  destroy() {
    onChange.unsubscribe(this.appState);
    onChange.unsubscribe(this.state);
  }

  appStateHook(path) {
    if (path === "favorites") {
      this.render();
    }
  }

  async stateHook(path) {
    const { search, offset } = this.state;
    if (path === "search" || path === "offset") {
      this.state.loading = true;
      const resp = await this.uploadBooks(search, offset * 10, 10);
      this.state.loading = false;
      this.state.numFound = resp.numFound;
      this.state.list = [...resp.docs];
      this.render();
    }

    if (path === "loading") {
      this.render();
    }

    if (path === "list") {
      this.render();
    }
  }

  async uploadBooks(q, offset, limit) {
    const resp = await fetch(
      `https://openlibrary.org/search.json?q=${q}&offset=${offset}&limit=${limit}`
    );
    const data = await resp.json();
    return data;
  }

  render() {
    const main = document.createElement("div");
    main.classList.add("books__count");
    main.innerHTML = `
    <div> 
        Найдено книг - ${this.state.numFound}
    </div>`;
    this.app.innerHTML = "";
    this.app.append(new Search(this.state).render()); // рендер Search компонента
    this.app.append(main);
    this.app.append(new CardsList(this.appState, this.state).render()); // рендер BookList компонента
    this.headerRender(); // рендер Header компонента
    if (this.state.numFound) {
      this.app.append(new Paginate(this.state).render());
    }
  }

  headerRender() {
    const header = new Header(this.appState).render();
    this.app.prepend(header);
  }
}
