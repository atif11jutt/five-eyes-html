import Page from "../classes/Page";

export default class Careers extends Page {
  constructor() {
    super({
      id: "careers",
      element: ".careers",
      elements: {
        navigation: document.querySelectorAll(".navigation__links")
      }
    });
  }
}
