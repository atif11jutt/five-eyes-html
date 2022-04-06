import Page from "../classes/Page";

export default class Service extends Page {
  constructor() {
    super({
      id: "service",
      element: ".service",
      elements: {
        navigation: document.querySelectorAll(".navigation__links")
      }
    });
  }
}
