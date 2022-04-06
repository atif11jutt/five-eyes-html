import Page from "../classes/Page";

export default class Contacts extends Page {
  constructor() {
    super({
      id: "contacts",
      element: ".contacts",
      elements: {
        name: document.querySelector("#nameTxt"),
        email: document.querySelector("#emailTxt"),
        company: document.querySelector("#organizationTxt"),
        enquiry: document.querySelector("#contentTxt"),
        navigation: document.querySelectorAll(".navigation__link")
      }
    });
  }
}
