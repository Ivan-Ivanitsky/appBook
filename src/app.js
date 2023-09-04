import { VievMain } from "./views/main/main";
import { Favorites } from "./components/favorites/favorites";
import "./app.css";
class App {
  router = [
    { path: "", view: VievMain },
    { path: "#search", view: VievMain },
    { path: "#favorites", view: Favorites },
  ];
  appState = {
    favorites: [],
  };
  constructor() {
    window.addEventListener("hashchange", this.route.bind(this));
    this.route();
  }

  route() {
    if (this.currentMain) {
      this.currentMain.destroy();
    }

    const view = this.router.find((r) => r.path === location.hash).view;
    this.currentMain = new view(this.appState);

    this.currentMain.render();
  }
}

new App();
