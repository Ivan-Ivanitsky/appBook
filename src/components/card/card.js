import { DivComponent } from "../../common/divComponent";
import "./card.css";
export class Card extends DivComponent {
  constructor(appState, cardState) {
    super();
    this.appState = appState;
    this.cardState = cardState;
  }

  render() {
    const favoritsExist = this.appState.favorites.find(
      (f) => f.key === this.cardState.key
    );

    let img = !this.cardState.cover_edition_key
      ? "../static/404.jpg"
      : `https://covers.openlibrary.org/b/olid/${this.cardState.cover_edition_key}-M.jpg`;

    this.el.classList.add("card");
    this.el.innerHTML = `
        <div class ='card__img'>
            <img src="${img}"alt="Обложка книги"/>
        </div>
        <div class ='card__wrapper'>
            <div class ='card__content'>
                <div class ="card__genre">${
                  !this.cardState.subject_key
                    ? "Не задано"
                    : this.cardState.subject_key[2]
                }</div>
                <div class=' card__title'>
                    ${this.cardState.title ? this.cardState.title : "Не задано"}
                </div>
                <div class="card__author">${
                  this.cardState.author_name
                    ? this.cardState.author_name[0]
                    : "Не задано"
                }</div>
            </div>
            <button class='btn ${favoritsExist ? "button__active" : ""}'>
                ${
                  !favoritsExist
                    ? ' <img src="../static/frame.svg" alt="Избранное" />'
                    : '<img src="../static/frameWhite.svg" alt="Избранное" />'
                }
            </button>
        </div>`;

    this.el.querySelector(".btn").addEventListener("click", (e) => {
      if (e.target && !favoritsExist) {
        this.appState.favorites.push(this.cardState);
      } else {
        this.appState.favorites = this.appState.favorites.filter(
          (c) => c.key != this.cardState.key
        );
      }
    });
    return this.el;
  }
}
