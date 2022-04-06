import gsap from "gsap";
import Component from "./Component";

export default class Accordion extends Component {
  constructor() {
    super({
      element: ".grid",
      elements: {
        grids: ".grid",
        buttons: ".servicess__categories__label",
        triangle: ".servicess__categories__label__arrow"
      }
    });

    console.log(this.elements.triangle, 2);
    this.init();
  }

  init() {
    this.buttons = this.elements.buttons;
    this.grids = this.elements.grids;
    this.triangle = this.elements.triangle;

    console.log(this.triangle);

    if (this.buttons && this.grids) {
      this.grids.forEach(grid => {
        this.buttons.forEach((button, index) => {
          button.addEventListener("click", e => {
            gsap.to(this.buttons, {
              color: "#000000"
            });

            gsap.to(this.buttons[index], {
              color: "#12c0c0"
            });

            // gsap.to(this.triangle[index], {
            //   autoAlpha: 1
            // });

            // console.log(this.triangle[index]);
          });
        });
      });

      this.buttons[0].addEventListener("click", (el, index) => {
        gsap.to([this.grids[1], this.grids[2]], {
          display: "none"
        });

        gsap.to(this.grids[0], {
          display: "block"
        });

        gsap.to([this.triangle[1], this.triangle[2]], {
          autoAlpha: 0
        });

        gsap.to(this.triangle[0], {
          autoAlpha: 1
        });
      });

      this.buttons[1].addEventListener("click", (el, index) => {
        gsap.to([this.grids[0], this.grids[2]], {
          display: "none"
        });

        gsap.to(this.grids[1], {
          display: "block"
        });

        gsap.to([this.triangle[0], this.triangle[2]], {
          autoAlpha: 0
        });

        gsap.to(this.triangle[1], {
          autoAlpha: 1
        });
      });

      this.buttons[2].addEventListener("click", (el, index) => {
        gsap.to([this.grids[0], this.grids[1]], {
          display: "none"
        });

        gsap.to(this.grids[2], {
          display: "block"
        });

        gsap.to([this.triangle[0], this.triangle[1]], {
          autoAlpha: 0
        });

        gsap.to(this.triangle[2], {
          autoAlpha: 1
        });
      });
    }
  }
}
