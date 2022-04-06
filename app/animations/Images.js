import gsap from "gsap";
import Animation from "../classes/Animation.js";

export default class ImageReveal extends Animation {
  constructor({ element, elements }) {
    super({
      element,
      elements
    });

    this.images = gsap.utils.toArray(".footer__images__grid__image");
  }

  animateIn() {
    this.timelineIn = gsap.timeline({
      delay: 0.3
    });

    gsap.set(this.element, {
      autoAlpha: 1
    });

    this.timelineIn.fromTo(
      this.images,
      {
        opacity: 0,
        yPercent: 100
      },
      {
        opacity: 1,
        yPercent: 0,
        duration: 0.4,
        stagger: 0.1
      }
    );
  }

  animateOut() {
    gsap.set(this.element, {
      autoAlpha: 0
    });
  }
}
