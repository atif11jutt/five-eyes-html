import { gsap } from "gsap";
import Animation from "../classes/Animation.js";
import SplitText from "../utils/SplitText.min";

export default class News extends Animation {
  constructor({ element, elements }) {
    super({
      element,
      elements
    });
  }

  animateIn() {
    this.timelineIn = gsap.timeline({
      delay: 1
    });

    gsap.set(this.element, {
      autoAlpha: 1
    });

    this.toArray = gsap.utils.toArray(this.elements);

    this.news = [...this.toArray];

    gsap.fromTo(
      this.element,
      {
        autoAlpha: 0
      },
      {
        autoAlpha: 1,
        ease: "expo.out",
        duration: 1.185
      }
    );
  }

  animateOut() {
    gsap.set(this.element, {
      autoAlpha: 0
    });
  }
}
