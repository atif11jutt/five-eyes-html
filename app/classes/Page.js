import gsap from "gsap";
import each from "lodash/each";
import Paragraph from "../animations/Paragraph.js";
import Title from "../animations/Title.js";
import News from "../animations/News.js";
import Images from "../animations/Images.js";
// import Rect from "../animations/Rect.js";
// import SplitText from "../utils/SplitText.min";
import map from "lodash/map";
import Navigation from "../animations/Navigation.js";

export default class Page {
  constructor({ id, element, elements }) {
    this.id = id;
    this.selector = element;
    this.selectorChildren = {
      ...elements,
      animationsTitles: "[data-animation='title']",
      animationsParagraphs: "[data-animation='paragraph']",
      animationsNavigation: "[ data-animation='navigation']",
      animationsNews: "[data-animation='news']",
      animationsImages: "[data-animation='image']"
    };

    // this.a = new SplitText(this.selectorChildren.title, {
    //   type: "words, chars"
    // });

    // this.b = new SplitText(this.selectorChildren.label, {
    //   type: "lines",
    //   linesClass: "b"
    // });
    // new SplitText(this.selectorChildren.label, {
    //   type: "lines",
    //   linesClass: "a"
    // });

    // this.c = new SplitText(this.selectorChildren.subheader, {
    //   type: "words, chars"
    // });

    // this.navigation = new SplitText(this.selectorChildren.navigation, {
    //   type: "lines",
    //   linesClass: "b"
    // });
    // new SplitText(this.selectorChildren.navigation, {
    //   type: "lines",
    //   linesClass: "a"
    // });

    // this.splittedElements = [
    //   this.navigation.lines,
    //   this.a.chars,
    //   this.b.lines,
    //   this.c.chars
    // ];
  }

  create() {
    this.elements = {};

    each(this.selectorChildren, (entry, key) => {
      if (
        entry instanceof window.HTMLElement ||
        entry instanceof window.NodeList ||
        entry instanceof window.SVGSVGElement ||
        Array.isArray(entry)
      ) {
        this.elements[key] = entry;
      } else {
        this.elements[key] = document.querySelectorAll(entry);

        if (this.elements[key].length === 0) {
          this.elements[key] = null;
        } else if (this.elements[key].length === 1) {
          this.elements[key] = document.querySelector(entry);
        }
      }
    });

    this.createAnimations();
  }

  createAnimations() {
    this.animations = [];

    // Titles.
    if (this.elements.animationsTitles != null) {
      this.animationsTitles = map(
        this.mapValidator(this.elements.animationsTitles),
        element => {
          return new Title({
            element
          });
        }
      );

      this.animations.push(...this.animationsTitles);
    }

    // Paragraphs.
    if (this.elements.animationsParagraphs != null) {
      this.animationsParagraphs = map(
        this.mapValidator(this.elements.animationsParagraphs),
        element => {
          return new Paragraph({
            element
          });
        }
      );

      this.animations.push(...this.animationsParagraphs);
    }

    // News.
    if (this.elements.animationsNews != null) {
      let that = this.elements.animationsNews;
      this.animationsNews = map(
        this.mapValidator(this.elements.animationsNews),
        (element, elements) => {
          return new News({
            element,
            elements: { item: that }
          });
        }
      );

      this.animations.push(...this.animationsNews);
    }

    // Navigation.
    if (this.elements.animationsImages != null) {
      this.animationsImages = map(
        this.mapValidator(this.elements.animationsImages),
        element => {
          return new Images({
            element
          });
        }
      );

      this.animations.push(...this.animationsImages);
    }

    // Lines.
    // this.animationsLines = map(this.elements.animationsLines, element => {
    //   return new Line({
    //     element
    //   });
    // });

    // this.animations.push(...this.animationsLines);
  }

  convertToArrayIfSingleElement(element) {
    this.singleTitle = [];

    if (!(element instanceof window.NodeList)) {
      this.singleTitle.push(element);

      return this.singleTitle;
    }
  }

  countAnimationElements(array) {
    let sum = 0;
    if (array.length > 1) {
      map(array, _ => sum++);
    }
    return sum;
  }

  mapValidator(element) {
    this.aboveLengthOne = this.countAnimationElements(element);
    this.oneElAnimation = this.convertToArrayIfSingleElement(element);

    return this.aboveLengthOne > 1 ? element : this.oneElAnimation;
  }

  onResize() {
    // each(this.animations, animation => animation.onResize());
  }

  // positionAnimations() {
  //   gsap.to(this.splittedElements, {
  //     delay: 0.3,
  //     y: "100%",
  //     ease: "expo.out",
  //     duration: 1.185
  //   });
  // }

  animateIn() {
    // this.animate = gsap.timeline();
    // this.animate.fromTo(
    //   this.splittedElements,
    //   {
    //     y: "100%",
    //     ease: "expo.out"
    //   },
    //   {
    //     y: 0,
    //     ease: "expo.out",
    //     duration: 1.5,
    //     stagger: 0.025
    //   }
    // );
  }
}
