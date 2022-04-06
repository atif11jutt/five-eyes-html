import Component from "../classes/Component";

export default class CareersForm extends Component {
  constructor() {
    super({
      element: ".team__footer__form",
      elements: {
        name: "#nameTxt2",
        email: "#emailTxt2",
        number: "#numberTxt",
        location: "#locationTxt"
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
        number: this.elements.number.value,
        location: this.elements.location.value
      };

      window.open(
        `mailto:enquiries@fiveeyes.com.au?subject=${this.inputs.name} - ${this.inputs.number}&body=PLEASE ATTACH YOUR CV`
      );

      this.element.reset();
    });
  }
}
