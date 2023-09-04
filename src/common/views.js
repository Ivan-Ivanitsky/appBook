export class Abstract {
  constructor() {
    this.app = document.querySelector("#root");
  }

  setTitle(title) {
    document.title = title;
  }

  destroy() {
    return;
  }

  render() {
    return;
  }
}
