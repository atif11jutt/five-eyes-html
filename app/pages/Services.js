import Page from "../classes/Page";

export default class Services extends Page {
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
