import { DivComponent } from "../../common/divComponent";
import "../search/search.css";
export class Search extends DivComponent {
  constructor(state) {
    super();
    this.state = state;
  }

  searchInput() {
    const input = this.el.querySelector("input").value;
    if (input != "") {
      this.state.search = input;
    }
    return;
  }

  render() {
    this.el.classList.add("search");
    this.el.innerHTML = `
    <div class='search__wrapper' >
        <input class='search__input' type="text" placeholder='Найти книгу или автора....' />
        <img class='search__img' src="../static/search.svg" alt="search" />
    </div>
    <button class='search__button'>
        <img src="../static/searchBtn.svg" alt="Btn" />
    </button>
    `;
    this.el
      .querySelector(".search__button")
      .addEventListener("click", this.searchInput.bind(this));

    this.el.querySelector(".search__input").addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        this.searchInput();
      }
    });
    return this.el;
  }
}
