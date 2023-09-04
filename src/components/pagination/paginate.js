import { DivComponent } from "../../common/divComponent";
import "./paginate.css";

export class Paginate extends DivComponent {
  constructor(state) {
    super();
    this.state = state;
  }

  render() {
    this.el.classList.add("paginate__wrapper");
    this.el.innerHTML = `
        <div class='arrow_left'>Предыдущая страница</div>
        <div class='arrow_right'>Следующая страница</div>`;

    this.el.querySelector(".arrow_left").addEventListener("click", (e) => {
      if (e.target && this.state.offset > 0) {
        console.log(this.state.list.lenght);
        this.state.offset--;
      }
    });

    this.el.querySelector(".arrow_right").addEventListener("click", (e) => {
      if (e.target) {
        console.log(this.state);
        this.state.offset++;
      }
    });

    return this.el;
  }
}
