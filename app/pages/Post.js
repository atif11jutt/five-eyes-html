import Page from "../classes/Page";

export default class Post extends Page {
  constructor() {
    super({
      id: "post",
      element: ".blog__header",
      elements: {
        navigation: document.querySelectorAll(".navigation__link")
      }
    });
  }
}
