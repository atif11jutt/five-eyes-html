import gsap from "gsap";
import Animation from "../classes/Animation.js";
import SplitText from "../utils/SplitText.min";

export default class Navigation extends Animation {
  constructor({ element, elements }) {
    super({
      element,
      elements
    });
  }

  animateIn() {
    this.timelineIn = gsap.timeline({
      delay: 0.7
    });

    this.timelineIn.set(this.element, {
      autoAlpha: 1
    });

    this.splittedParagraph = new SplitText(this.element, {
      type: "lines",
      linesClass: "b"
    });
    new SplitText(this.element, { type: "lines", linesClass: "a" });

    this.timelineIn.fromTo(
      this.splittedParagraph.lines,
      {
        yPercent: 100
      },
      {
        yPercent: 0,
        ease: "expo.out",
        duration: 1.5,
        stagger: 0.15
      }
    );
  }

  animateOut() {
    gsap.set(this.element, {
      autoAlpha: 0
    });
  }
}
