import Page from "../classes/Page";

export default class About extends Page {
  constructor() {
    super({
      id: "about",
      element: ".about",
      elements: {
        // wrapper: ".about__wrapper",
        // title: ".home__intro__title",
        // subheader: ".home__intro__subheader",
        // label: ".home__intro__label",
        navigation: document.querySelectorAll(".navigation__links")
      }
    });
  }
}
