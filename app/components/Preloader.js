import Component from "../classes/Component";
import SplitText from "../utils/SplitText.min";
import gsap from "gsap";
import imagesLoaded from "imagesloaded";
import FontFaceObserver from "fontfaceobserver";

export default class Preloader extends Component {
  constructor() {
    super({
      element: ".preloader",
      elements: {
        logo: ".preloader__logo"
      }
    });

    this.hideFontsBeforeLoading();
    this.loadFonts();
    // this.animateIn();
  }

  /**
   * Load the website fonts
   */
  loadFonts() {
    this.poppins = new FontFaceObserver("Poppins");
    this.clashDisplay = new FontFaceObserver("Clash Display");

    Promise.all([this.poppins.load(), this.clashDisplay.load()]).then(font => {
      console.log("Fonts loaded! Ready to go 🚀");
      this.animateIn();
    });
  }

  hideFontsBeforeLoading() {
    gsap.set(this.elements.logo, {
      opacity: 0
    });
  }

  animateIn() {
    gsap.set(this.elements.logo, {
      opacity: 1,
      ease: "expo.in",
      onComplete: _ => this.animateOut()
    });
  }

  animateOut() {
    this.timelineOut = gsap.timeline({
      delay: 2
    });

    this.timelineOut.to(this.elements.logo, {
      autoAlpha: 0,
      onComplete: _ => this.preloaderOut()
    });
  }

  preloaderOut() {
    this.preloaderAnimateOut = gsap.timeline({
      delay: 1
    });

    this.preloaderAnimateOut.to(
      this.element,
      {
        scaleY: 0,
        transformOrigin: "0 0",
        duration: 0.9,
        ease: "expo.in",
        onComplete: () => {
          window.scroll(0, 0);
        }
      },
      "-=1"
    );

    this.preloaderAnimateOut.call(_ => {
      this.emit("completed");
    });
  }

  destroy() {
    this.element.parentNode.removeChild(this.element);
  }
}
