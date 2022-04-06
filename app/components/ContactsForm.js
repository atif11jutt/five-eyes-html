import Component from "../classes/Component";

export default class ContactsForm extends Component {
  constructor() {
    super({
      element: ".contacts__footer__form",
      elements: {
        name: "#nameTxt",
        email: "#emailTxt",
        company: "#organizationTxt",
        enquiry: "#contentTxt"
      }
    });

    this.sendEmail();
  }

  sendEmail() {
    this.element.addEventListener("submit", e => {
      e.preventDefault();

      this.inputs = {
        name: this.elements.name.value,
        email: this.elements.email.value,
        company: this.elements.company.value,
        enquiry: this.elements.enquiry.value
      };

      window.open(
        `mailto:enquiries@fiveeyes.com.au?subject=${this.inputs.name} - ${this.inputs.company}&body=${this.inputs.enquiry}`
      );

      this.element.reset();
    });
  }
}
