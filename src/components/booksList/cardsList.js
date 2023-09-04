import { DivComponent } from "../../common/divComponent";
import { Card } from "../card/card";
import "./cardsList.css";

export class CardsList extends DivComponent {
  constructor(appState, state) {
    super();
    this.appState = appState;
    this.state = state;
  }

  render() {
    const { loading, list } = this.state;
    if (loading) {
      this.el.classList.add("cards__list");
      this.el.innerHTML = `
      <div class='cards__spinner'>
          <div class='spinner'>
          </div>
      </div>`;
      return this.el;
    }

    const grid = document.createElement("div");
    grid.classList.add("grid__card");
    for (const card of this.state.list) {
      grid.append(new Card(this.appState, card).render());
    }
    return !list.length ? "" : grid;
  }
}
