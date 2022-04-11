import Scroll from "./classes/Scroll";
import Home from "./pages/Home";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import Careers from "./pages/Careers";
import Services from "./pages/Services";
import Service from "./pages/Service";
import Post from "./pages/Post";
import Canvas from "./classes/Canvas";
import Preloader from "./components/Preloader";
import Accordion from "./classes/Accordion";

import VerticalSlider from "./components/VerticalSlider";

import vertex from "./shaders/mainMesh-vertex.glsl";
import fragment from "./shaders/mainMesh-fragment.glsl";

import cyberSecVertex from "./shaders/cyberSec-vertex.glsl";
import cyberSecFragment from "./shaders/cyberSec-fragment.glsl";

import cloudCompVertex from "./shaders/cloudComp-vertex.glsl";
import cloudCompFragment from "./shaders/cloudComp-fragment.glsl";

import networkServVertex from "./shaders/networkServ-vertex.glsl";
import networkServFragment from "./shaders/networkServ-fragment.glsl";

import securityAudVertex from "./shaders/securityAud-vertex.glsl";
import securityAudFragment from "./shaders/securityAud-fragment.glsl";

import vertexContacts from "./shaders/contacts-vertex.glsl";
import fragmentContacts from "./shaders/contacts-fragment.glsl";

import vertexCareers from "./shaders/careers-vertex.glsl";
import fragmentCareers from "./shaders/careers-fragment.glsl";

import barba from '@barba/core';
import gsap from 'gsap';
import ContactsForm from "./components/ContactsForm";
import CareersForm from "./components/CareersForm";


class App {
  constructor() {
    this.pages = {};

    this.createContent();

    // this.createPreloader();
    this.createPages();

    // this.customScroll();
    // this.marquee();

    // this.pageTransitions();

    // create owl carousel
    // this.createNewsSlider();
    
    this.createForms();
  }

  customScroll() {
    this.smoothScroll = new Scroll({
      template: document.querySelector(".scrollable"),
      wrapper: document.querySelector("#main-wrapper")
    });
  }

  createPreloader() {
    this.preloader = new Preloader();

    this.preloader.once("completed", this.onPreloaded.bind(this));
  }

  createNewsSlider(){
    
    var owl2 = $("#news_slider");
    owl2.owlCarousel({
      items: 3,
      margin: 40,
      loop: true,
      nav: false,
      responsiveClass: true,
      responsive: {
        0: {
          items: 1,
          margin: 20
        },

        600: {
          items: 2,
          margin: 20
        },

        1024: {
          items: 3
        },

        1366: {
          items: 3
        }
      }
    });
  }

  onPreloaded() {
    this.preloader.destroy();

    // this.page.animateInAfterPreloader();
  }

  /**
   * Set up the page content and template
   */
  createContent() {
    this.content = document.querySelector(".content");

    this.template = this.content.getAttribute("data-template");
  }

  /**
   * Creates the pages. Instantiates its Classes
   */
  createPages() {
    this.pages = {
      about: new About(),
      home: new Home(),
      contacts: new Contacts(),
      careers: new Careers(),
      post: new Post(),
      services: new Services(),
      service: new Service()
    };

    this.page = this.pages[this.template];

    this.page.create();

    // this.page.positionAnimations();

    this.onResize();

    this.createCanvas();
  }

  createCanvas() {
    if (document.querySelector(".home__canvas")) {
      this.mainMesh = new Canvas({
        canvas: document.querySelector(".home__canvas"),
        geometryType: "mainBall",
        vertexFile: vertex,
        fragmentFile: fragment
      });

      this.sphereMesh = new Canvas({
        canvas: document.querySelector("#cyber__sec__canvas"),
        geometryType: "dodecahedron",
        vertexFile: cyberSecVertex,
        fragmentFile: cyberSecFragment
      });

      this.planeMesh = new Canvas({
        canvas: document.querySelector("#cloud__comp__canvas"),
        geometryType: "plane",
        vertexFile: cloudCompVertex,
        fragmentFile: cloudCompFragment
      });

      this.torusMesh = new Canvas({
        canvas: document.querySelector("#network__serv__canvas"),
        geometryType: "torus",
        vertexFile: networkServVertex,
        fragmentFile: networkServFragment
      });

      this.plane2Mesh = new Canvas({
        canvas: document.querySelector("#security_aud__canvas"),
        geometryType: "plane2",
        vertexFile: securityAudVertex,
        fragmentFile: securityAudFragment
      });
    }

    if (document.querySelector(".contacts__canvas")) {
      this.contactsMesh = new Canvas({
        canvas: document.querySelector(".contacts__canvas"),
        geometryType: "contacts",
        vertexFile: vertexContacts,
        fragmentFile: fragmentContacts
      });
    }

    if (document.querySelector(".careers__canvas")) {
      this.contactsMesh = new Canvas({
        canvas: document.querySelector(".careers__canvas"),
        geometryType: "careers",
        vertexFile: vertexCareers,
        fragmentFile: fragmentCareers
      });
    }
  }

  createForms() {
    if (document.querySelector(".contacts__footer__form"))
      this.contactsForm = new ContactsForm();

    if (document.querySelector(".team__footer__form"))
      this.contactsForm = new CareersForm();
  }

  servicesAccordion() {
    this.accordion = new Accordion();
  }

  /**
   * Initialize the vertical sliders
   */
  marquee() {
    this.slider = new VerticalSlider({
      spans: document.querySelectorAll(".footer__marquee a"),
      title: document.querySelector(".footer__marquee")
    });

    this.slider.slider();
  }

  onResize() {
    if (this.page && this.page.onResize) {
      this.page.onResize();
    }
  }

  pageTransitions() {
    let that = this;
    // this.webgl = document.querySelector(".webgl");

    barba.init({
      transitions: [
        // home-about
        {
          name: "home-about",
          from: {
            namespace: ["home"]
          },
          to: {
            namespace: ["about"]
          },
          leave(data) {
            return gsap.to(data.current.container, {
              duration: 0.75,
              opacity: 0,
              onComplete: () => {
                window.scroll(0, 0);
              }
            });
          },
          once(data) { },
          enter(data) {
            // that.smoothScroll = new Scroll({
            //   template: [...data.next.container.children][0],
            //   wrapper: data.next.container
            // });

            // that.customScroll();

            let dataTemplate = [...data.next.container.children][0].children;

            that.content = [...dataTemplate][1];

            that.template = that.content.getAttribute("data-template");

            that.page = that.pages[that.template];

            that.page.create();
            that.onResize();

            window.scroll(0, 0);
            that.marquee();

            return gsap.from(data.next.container, {
              duration: 0.75,
              opacity: 0
            });
          }
        },
        // about-home
        {
          name: "about-home",
          from: {
            namespace: ["about"]
          },
          to: {
            namespace: ["home"]
          },
          leave(data) {
            return gsap.to(data.current.container, {
              duration: 0.75,
              opacity: 0,
              onComplete: () => {
                window.scroll(0, 0);
              }
            });
          },
          once(data) { },
          enter(data) {
            // that.smoothScroll = new Scroll({
            //   template: [...data.next.container.children][0],
            //   wrapper: data.next.container
            // });

            // that.customScroll();
            let dataTemplate = [...data.next.container.children][0].children;

            that.content = [...dataTemplate][1];

            that.template = that.content.getAttribute("data-template");

            that.page = that.pages[that.template];

            that.page.create();
            that.onResize();

            that.createCanvas();

            // window.scroll(0, 0);
            that.marquee();

            return gsap.from(data.next.container, {
              duration: 0.75,
              opacity: 0
            });
          }
        },
        // about-careers
        {
          name: "about-careers",
          from: {
            namespace: ["about"]
          },
          to: {
            namespace: ["careers"]
          },
          leave(data) {
            return gsap.to(data.current.container, {
              duration: 0.75,
              opacity: 0,
              onComplete: () => {
                window.scroll(0, 0);
              }
            });
          },
          once(data) { },
          enter(data) {
            // that.smoothScroll = new Scroll({
            //   template: [...data.next.container.children][0],
            //   wrapper: data.next.container
            // });

            // that.customScroll();
            let dataTemplate = [...data.next.container.children][0].children;

            that.content = [...dataTemplate][1];

            that.template = that.content.getAttribute("data-template");

            that.page = that.pages[that.template];

            that.page.create();
            that.onResize();

            // window.scroll(0, 0);
            that.marquee();

            return gsap.from(data.next.container, {
              duration: 0.75,
              opacity: 0
            });
          }
        },
        // about-contacts
        {
          name: "about-contacts",
          from: {
            namespace: ["about"]
          },
          to: {
            namespace: ["contacts"]
          },
          leave(data) {
            return gsap.to(data.current.container, {
              duration: 0.75,
              opacity: 0,
              onComplete: () => {
                window.scroll(0, 0);
              }
            });
          },
          once(data) { },
          enter(data) {
            // that.smoothScroll = new Scroll({
            //   template: [...data.next.container.children][0],
            //   wrapper: data.next.container
            // });

            // that.customScroll();
            let dataTemplate = [...data.next.container.children][0].children;

            that.content = [...dataTemplate][1];

            that.template = that.content.getAttribute("data-template");

            that.page = that.pages[that.template];

            that.page.create();
            that.onResize();

            that.createCanvas();

            window.scroll(0, 0);
            that.marquee();

            return gsap.from(data.next.container, {
              duration: 0.75,
              opacity: 0
            });
          }
        },
        // about-news
        {
          name: "about-news",
          from: {
            namespace: ["about"]
          },
          to: {
            namespace: ["news"]
          },
          leave(data) {
            return gsap.to(data.current.container, {
              duration: 0.75,
              opacity: 0,
              onComplete: () => {
                window.scroll(0, 0);
              }
            });
          },
          once(data) { },
          enter(data) {
            // that.smoothScroll = new Scroll({
            //   template: [...data.next.container.children][0],
            //   wrapper: data.next.container
            // });

            // that.customScroll();
            let dataTemplate = [...data.next.container.children][0].children;

            that.content = [...dataTemplate][1];

            that.template = that.content.getAttribute("data-template");

            that.page = that.pages[that.template];

            that.page.create();
            that.onResize();

            window.scroll(0, 0);
            that.marquee();

            return gsap.from(data.next.container, {
              duration: 0.75,
              opacity: 0
            });
          }
        },
        // about-blog
        {
          name: "about-blog",
          from: {
            namespace: ["about"]
          },
          to: {
            namespace: ["blogPost"]
          },
          leave(data) {
            return gsap.to(data.current.container, {
              duration: 0.75,
              opacity: 0,
              onComplete: () => {
                window.scroll(0, 0);
              }
            });
          },
          once(data) { },
          enter(data) {
            // that.smoothScroll = new Scroll({
            //   template: [...data.next.container.children][0],
            //   wrapper: data.next.container
            // });

            // that.customScroll();
            let dataTemplate = [...data.next.container.children][0].children;

            that.content = [...dataTemplate][1];

            that.template = that.content.getAttribute("data-template");

            that.page = that.pages[that.template];

            that.page.create();
            that.onResize();

            window.scroll(0, 0);
            that.marquee();

            return gsap.from(data.next.container, {
              duration: 0.75,
              opacity: 0
            });
          }
        },

        // home-careers
        {
          name: "home-careers",
          from: {
            namespace: ["home"]
          },
          to: {
            namespace: ["careers"]
          },
          leave(data) {
            return gsap.to(data.current.container, {
              duration: 0.75,
              opacity: 0,
              onComplete: () => {
                window.scroll(0, 0);
              }
            });
          },
          once(data) { },
          enter(data) {
            // that.smoothScroll = new Scroll({
            //   template: [...data.next.container.children][0],
            //   wrapper: data.next.container
            // });

            // that.customScroll();
            let dataTemplate = [...data.next.container.children][0].children;

            that.content = [...dataTemplate][1];

            that.template = that.content.getAttribute("data-template");

            that.page = that.pages[that.template];

            that.page.create();
            that.onResize();

            that.createCanvas();

            window.scroll(0, 0);
            that.marquee();

            return gsap.from(data.next.container, {
              duration: 0.75,
              opacity: 0
            });
          }
        },

        // careers-home
        {
          name: "careers-home",
          from: {
            namespace: ["careers"]
          },
          to: {
            namespace: ["home"]
          },
          leave(data) {
            return gsap.to(data.current.container, {
              duration: 0.75,
              opacity: 0,
              onComplete: () => {
                window.scroll(0, 0);
              }
            });
          },
          once(data) { },
          enter(data) {
            // that.smoothScroll = new Scroll({
            //   template: [...data.next.container.children][0],
            //   wrapper: data.next.container
            // });

            // that.customScroll();
            let dataTemplate = [...data.next.container.children][0].children;

            that.content = [...dataTemplate][1];

            that.template = that.content.getAttribute("data-template");

            that.page = that.pages[that.template];

            that.page.create();
            that.onResize();

            that.createCanvas();

            window.scroll(0, 0);
            that.marquee();

            return gsap.from(data.next.container, {
              duration: 0.75,
              opacity: 0
            });
          }
        },
        // careers-about
        {
          name: "about-careers",
          from: {
            namespace: ["careers"]
          },
          to: {
            namespace: ["about"]
          },
          leave(data) {
            return gsap.to(data.current.container, {
              duration: 0.75,
              opacity: 0,
              onComplete: () => {
                window.scroll(0, 0);
              }
            });
          },
          once(data) { },
          enter(data) {
            // that.smoothScroll = new Scroll({
            //   template: [...data.next.container.children][0],
            //   wrapper: data.next.container
            // });

            // that.customScroll();
            let dataTemplate = [...data.next.container.children][0].children;

            that.content = [...dataTemplate][1];

            that.template = that.content.getAttribute("data-template");

            that.page = that.pages[that.template];

            that.page.create();
            that.onResize();

            window.scroll(0, 0);
            that.marquee();

            return gsap.from(data.next.container, {
              duration: 0.75,
              opacity: 0
            });
          }
        },
        // careers-contacts
        {
          name: "careers-contacts",
          from: {
            namespace: ["careers"]
          },
          to: {
            namespace: ["contacts"]
          },
          leave(data) {
            return gsap.to(data.current.container, {
              duration: 0.75,
              opacity: 0,
              onComplete: () => {
                window.scroll(0, 0);
              }
            });
          },
          once(data) { },
          enter(data) {
            // that.smoothScroll = new Scroll({
            //   template: [...data.next.container.children][0],
            //   wrapper: data.next.container
            // });

            // that.customScroll();
            let dataTemplate = [...data.next.container.children][0].children;

            that.content = [...dataTemplate][1];

            that.template = that.content.getAttribute("data-template");

            that.page = that.pages[that.template];

            that.page.create();
            that.onResize();

            that.createCanvas();

            window.scroll(0, 0);
            that.marquee();

            return gsap.from(data.next.container, {
              duration: 0.75,
              opacity: 0
            });
          }
        },
        // careers-news
        {
          name: "careers-news",
          from: {
            namespace: ["careers"]
          },
          to: {
            namespace: ["news"]
          },
          leave(data) {
            return gsap.to(data.current.container, {
              duration: 0.75,
              opacity: 0,
              onComplete: () => {
                window.scroll(0, 0);
              }
            });
          },
          once(data) { },
          enter(data) {
            // that.smoothScroll = new Scroll({
            //   template: [...data.next.container.children][0],
            //   wrapper: data.next.container
            // });

            // that.customScroll();
            let dataTemplate = [...data.next.container.children][0].children;

            that.content = [...dataTemplate][1];

            that.template = that.content.getAttribute("data-template");

            that.page = that.pages[that.template];

            that.page.create();
            that.onResize();

            window.scroll(0, 0);
            that.marquee();

            return gsap.from(data.next.container, {
              duration: 0.75,
              opacity: 0
            });
          }
        },

        // home-contacts
        {
          name: "home-contacts",
          from: {
            namespace: ["home"]
          },
          to: {
            namespace: ["contacts"]
          },
          leave(data) {
            return gsap.to(data.current.container, {
              duration: 0.75,
              opacity: 0
              // onComplete: () => {
              //   window.scroll(0, 0);
              // }
            });
          },
          once(data) { },
          enter(data) {
            // that.smoothScroll = new Scroll({
            //   template: [...data.next.container.children][0],
            //   wrapper: data.next.container
            // });

            // that.customScroll();

            let dataTemplate = [...data.next.container.children][0].children;

            that.content = [...dataTemplate][1];

            that.template = that.content.getAttribute("data-template");

            that.page = that.pages[that.template];

            that.page.create();
            that.onResize();

            that.createCanvas();

            window.scroll(0, 0);
            that.marquee();

            return gsap.from(data.next.container, {
              duration: 0.75,
              opacity: 0
            });
          }
        },
        // contacts-home
        {
          name: "contacts-home",
          from: {
            namespace: ["contacts"]
          },
          to: {
            namespace: ["home"]
          },
          leave(data) {
            return gsap.to(data.current.container, {
              duration: 0.75,
              opacity: 0,
              onComplete: () => {
                window.scroll(0, 0);
              }
            });
          },
          once(data) { },
          enter(data) {
            // that.smoothScroll = new Scroll({
            //   template: [...data.next.container.children][0],
            //   wrapper: data.next.container
            // });

            // that.customScroll();
            let dataTemplate = [...data.next.container.children][0].children;

            that.content = [...dataTemplate][1];

            that.template = that.content.getAttribute("data-template");

            that.page = that.pages[that.template];

            that.page.create();
            that.onResize();

            that.createCanvas();

            window.scroll(0, 0);
            that.marquee();

            return gsap.from(data.next.container, {
              duration: 0.75,
              opacity: 0
            });
          }
        },
        // contacts-about
        {
          name: "contacts-about",
          from: {
            namespace: ["contacts"]
          },
          to: {
            namespace: ["about"]
          },
          leave(data) {
            return gsap.to(data.current.container, {
              duration: 0.75,
              opacity: 0,
              onComplete: () => {
                window.scroll(0, 0);
              }
            });
          },
          once(data) { },
          enter(data) {
            // that.smoothScroll = new Scroll({
            //   template: [...data.next.container.children][0],
            //   wrapper: data.next.container
            // });

            // that.customScroll();
            let dataTemplate = [...data.next.container.children][0].children;

            that.content = [...dataTemplate][1];

            that.template = that.content.getAttribute("data-template");

            that.page = that.pages[that.template];

            that.page.create();
            that.onResize();

            window.scroll(0, 0);
            that.marquee();

            return gsap.from(data.next.container, {
              duration: 0.75,
              opacity: 0
            });
          }
        },
        // contacts-careers
        {
          name: "contacts-careers",
          from: {
            namespace: ["contacts"]
          },
          to: {
            namespace: ["careers"]
          },
          leave(data) {
            return gsap.to(data.current.container, {
              duration: 0.75,
              opacity: 0,
              onComplete: () => {
                window.scroll(0, 0);
              }
            });
          },
          once(data) { },
          enter(data) {
            // that.smoothScroll = new Scroll({
            //   template: [...data.next.container.children][0],
            //   wrapper: data.next.container
            // });

            // that.customScroll();
            let dataTemplate = [...data.next.container.children][0].children;

            that.content = [...dataTemplate][1];

            that.template = that.content.getAttribute("data-template");

            that.page = that.pages[that.template];

            that.page.create();
            that.onResize();

            that.createCanvas();

            window.scroll(0, 0);
            that.marquee();

            return gsap.from(data.next.container, {
              duration: 0.75,
              opacity: 0
            });
          }
        },
        // contacts-news
        {
          name: "contacts-news",
          from: {
            namespace: ["contacts"]
          },
          to: {
            namespace: ["news"]
          },
          leave(data) {
            return gsap.to(data.current.container, {
              duration: 0.75,
              opacity: 0,
              onComplete: () => {
                window.scroll(0, 0);
              }
            });
          },
          once(data) { },
          enter(data) {
            // that.smoothScroll = new Scroll({
            //   template: [...data.next.container.children][0],
            //   wrapper: data.next.container
            // });

            // that.customScroll();
            let dataTemplate = [...data.next.container.children][0].children;

            that.content = [...dataTemplate][1];

            that.template = that.content.getAttribute("data-template");

            that.page = that.pages[that.template];

            that.page.create();
            that.onResize();

            window.scroll(0, 0);
            that.marquee();

            return gsap.from(data.next.container, {
              duration: 0.75,
              opacity: 0
            });
          }
        },
        // contacts-blog
        {
          name: "contacts-blog",
          from: {
            namespace: ["contacts"]
          },
          to: {
            namespace: ["blogPost"]
          },
          leave(data) {
            return gsap.to(data.current.container, {
              duration: 0.75,
              opacity: 0,
              onComplete: () => {
                window.scroll(0, 0);
              }
            });
          },
          once(data) { },
          enter(data) {
            // that.smoothScroll = new Scroll({
            //   template: [...data.next.container.children][0],
            //   wrapper: data.next.container
            // });

            // that.customScroll();
            let dataTemplate = [...data.next.container.children][0].children;

            that.content = [...dataTemplate][1];

            that.template = that.content.getAttribute("data-template");

            that.page = that.pages[that.template];

            that.page.create();
            that.onResize();

            window.scroll(0, 0);
            that.marquee();

            return gsap.from(data.next.container, {
              duration: 0.75,
              opacity: 0
            });
          }
        },

        // home-news
        {
          name: "home-news",
          from: {
            namespace: ["home"]
          },
          to: {
            namespace: ["news"]
          },
          leave(data) {
            return gsap.to(data.current.container, {
              duration: 0.8,
              opacity: 0,
              onComplete: () => {
                window.scroll(0, 0);
              }
            });
          },
          once(data) { },
          enter(data) {
            // that.smoothScroll = new Scroll({
            //   template: [...data.next.container.children][0],
            //   wrapper: data.next.container
            // });

            // that.customScroll();
            let dataTemplate = [...data.next.container.children][0].children;

            that.content = [...dataTemplate][1];

            that.template = that.content.getAttribute("data-template");

            that.page = that.pages[that.template];

            that.page.create();
            that.onResize();

            window.scroll(0, 0);
            that.marquee();

            return gsap.from(data.next.container, {
              duration: 0.8,
              opacity: 0
            });
          }
        },
        // news-home
        {
          name: "news-home",
          from: {
            namespace: ["news"]
          },
          to: {
            namespace: ["home"]
          },
          leave(data) {
            return gsap.to(data.current.container, {
              duration: 0.75,
              opacity: 0,
              onComplete: () => {
                window.scroll(0, 0);
              }
            });
          },
          once(data) { },
          enter(data) {
            // that.smoothScroll = new Scroll({
            //   template: [...data.next.container.children][0],
            //   wrapper: data.next.container
            // });

            // that.customScroll();
            let dataTemplate = [...data.next.container.children][0].children;

            that.content = [...dataTemplate][1];

            that.template = that.content.getAttribute("data-template");

            that.page = that.pages[that.template];

            that.page.create();
            that.onResize();

            that.createCanvas();

            window.scroll(0, 0);
            that.marquee();

            return gsap.from(data.next.container, {
              duration: 0.75,
              opacity: 0
            });
          }
        },
        // news-about
        {
          name: "news-about",
          from: {
            namespace: ["news"]
          },
          to: {
            namespace: ["about"]
          },
          leave(data) {
            return gsap.to(data.current.container, {
              duration: 0.75,
              opacity: 0,
              onComplete: () => {
                window.scroll(0, 0);
              }
            });
          },
          once(data) { },
          enter(data) {
            // that.smoothScroll = new Scroll({
            //   template: [...data.next.container.children][0],
            //   wrapper: data.next.container
            // });

            // that.customScroll();
            let dataTemplate = [...data.next.container.children][0].children;

            that.content = [...dataTemplate][1];

            that.template = that.content.getAttribute("data-template");

            that.page = that.pages[that.template];

            that.page.create();
            that.onResize();

            window.scroll(0, 0);
            that.marquee();

            return gsap.from(data.next.container, {
              duration: 0.75,
              opacity: 0
            });
          }
        },
        // news-contacts
        {
          name: "news-contacts",
          from: {
            namespace: ["news"]
          },
          to: {
            namespace: ["contacts"]
          },
          leave(data) {
            return gsap.to(data.current.container, {
              duration: 0.75,
              opacity: 0,
              onComplete: () => {
                window.scroll(0, 0);
              }
            });
          },
          once(data) { },
          enter(data) {
            // that.smoothScroll = new Scroll({
            //   template: [...data.next.container.children][0],
            //   wrapper: data.next.container
            // });

            // that.customScroll();
            let dataTemplate = [...data.next.container.children][0].children;

            that.content = [...dataTemplate][1];

            that.template = that.content.getAttribute("data-template");

            that.page = that.pages[that.template];

            that.page.create();
            that.onResize();

            that.createCanvas();

            window.scroll(0, 0);
            that.marquee();

            return gsap.from(data.next.container, {
              duration: 0.75,
              opacity: 0
            });
          }
        },
        // news-careers
        {
          name: "news-careers",
          from: {
            namespace: ["news"]
          },
          to: {
            namespace: ["careers"]
          },
          leave(data) {
            return gsap.to(data.current.container, {
              duration: 0.75,
              opacity: 0,
              onComplete: () => {
                window.scroll(0, 0);
              }
            });
          },
          once(data) { },
          enter(data) {
            // that.smoothScroll = new Scroll({
            //   template: [...data.next.container.children][0],
            //   wrapper: data.next.container
            // });

            // that.customScroll();
            let dataTemplate = [...data.next.container.children][0].children;

            that.content = [...dataTemplate][1];

            that.template = that.content.getAttribute("data-template");

            that.page = that.pages[that.template];

            that.page.create();
            that.onResize();

            that.createCanvas();

            window.scroll(0, 0);
            that.marquee();

            return gsap.from(data.next.container, {
              duration: 0.75,
              opacity: 0
            });
          }
        },
        // news-blog
        {
          name: "news-blog",
          from: {
            namespace: ["news"]
          },
          to: {
            namespace: ["blogPost"]
          },
          leave(data) {
            return gsap.to(data.current.container, {
              duration: 0.75,
              opacity: 0,
              onComplete: () => {
                window.scroll(0, 0);
              }
            });
          },
          once(data) { },
          enter(data) {
            // that.smoothScroll = new Scroll({
            //   template: [...data.next.container.children][0],
            //   wrapper: data.next.container
            // });

            // that.customScroll();
            let dataTemplate = [...data.next.container.children][0].children;

            that.content = [...dataTemplate][1];

            that.template = that.content.getAttribute("data-template");

            that.page = that.pages[that.template];

            that.page.create();
            that.onResize();

            window.scroll(0, 0);
            that.marquee();

            return gsap.from(data.next.container, {
              duration: 0.75,
              opacity: 0
            });
          }
        },

        // home-blog
        {
          name: "home-blog",
          from: {
            namespace: ["home"]
          },
          to: {
            namespace: ["blogPost"]
          },
          leave(data) {
            return gsap.to(data.current.container, {
              duration: 0.8,
              opacity: 0,
              onComplete: () => {
                window.scroll(0, 0);
              }
            });
          },
          once(data) { },
          enter(data) {
            // that.smoothScroll = new Scroll({
            //   template: [...data.next.container.children][0],
            //   wrapper: data.next.container
            // });

            // that.customScroll();
            let dataTemplate = [...data.next.container.children][0].children;

            that.content = [...dataTemplate][1];

            that.template = that.content.getAttribute("data-template");

            that.page = that.pages[that.template];

            that.page.create();
            that.onResize();

            window.scroll(0, 0);
            that.marquee();

            return gsap.from(data.next.container, {
              duration: 0.8,
              opacity: 0
            });
          }
        },
        // blog-home
        {
          name: "blog-home",
          from: {
            namespace: ["blogPost"]
          },
          to: {
            namespace: ["home"]
          },
          leave(data) {
            return gsap.to(data.current.container, {
              duration: 0.75,
              opacity: 0,
              onComplete: () => {
                window.scroll(0, 0);
              }
            });
          },
          once(data) { },
          enter(data) {
            // that.smoothScroll = new Scroll({
            //   template: [...data.next.container.children][0],
            //   wrapper: data.next.container
            // });

            // that.customScroll();
            let dataTemplate = [...data.next.container.children][0].children;

            that.content = [...dataTemplate][1];

            that.template = that.content.getAttribute("data-template");

            that.page = that.pages[that.template];

            that.page.create();
            that.onResize();

            that.createCanvas();

            window.scroll(0, 0);
            that.marquee();

            return gsap.from(data.next.container, {
              duration: 0.75,
              opacity: 0
            });
          }
        },
        // blog-about
        {
          name: "blog-about",
          from: {
            namespace: ["blogPost"]
          },
          to: {
            namespace: ["about"]
          },
          leave(data) {
            return gsap.to(data.current.container, {
              duration: 0.75,
              opacity: 0,
              onComplete: () => {
                window.scroll(0, 0);
              }
            });
          },
          once(data) { },
          enter(data) {
            // that.smoothScroll = new Scroll({
            //   template: [...data.next.container.children][0],
            //   wrapper: data.next.container
            // });

            // that.customScroll();
            let dataTemplate = [...data.next.container.children][0].children;

            that.content = [...dataTemplate][1];

            that.template = that.content.getAttribute("data-template");

            that.page = that.pages[that.template];

            that.page.create();
            that.onResize();

            that.createCanvas();

            window.scroll(0, 0);
            that.marquee();

            return gsap.from(data.next.container, {
              duration: 0.75,
              opacity: 0
            });
          }
        },
        // blog-careers
        {
          name: "blog-careers",
          from: {
            namespace: ["blogPost"]
          },
          to: {
            namespace: ["careers"]
          },
          leave(data) {
            return gsap.to(data.current.container, {
              duration: 0.75,
              opacity: 0,
              onComplete: () => {
                window.scroll(0, 0);
              }
            });
          },
          once(data) { },
          enter(data) {
            // that.smoothScroll = new Scroll({
            //   template: [...data.next.container.children][0],
            //   wrapper: data.next.container
            // });

            // that.customScroll();
            let dataTemplate = [...data.next.container.children][0].children;

            that.content = [...dataTemplate][1];

            that.template = that.content.getAttribute("data-template");

            that.page = that.pages[that.template];

            that.page.create();
            that.onResize();

            that.createCanvas();

            window.scroll(0, 0);
            that.marquee();

            return gsap.from(data.next.container, {
              duration: 0.75,
              opacity: 0
            });
          }
        },
        // blog-contacts
        {
          name: "blog-contacts",
          from: {
            namespace: ["blogPost"]
          },
          to: {
            namespace: ["contacts"]
          },
          leave(data) {
            return gsap.to(data.current.container, {
              duration: 0.75,
              opacity: 0,
              onComplete: () => {
                window.scroll(0, 0);
              }
            });
          },
          once(data) { },
          enter(data) {
            // that.smoothScroll = new Scroll({
            //   template: [...data.next.container.children][0],
            //   wrapper: data.next.container
            // });

            // that.customScroll();
            let dataTemplate = [...data.next.container.children][0].children;

            that.content = [...dataTemplate][1];

            that.template = that.content.getAttribute("data-template");

            that.page = that.pages[that.template];

            that.page.create();
            that.onResize();

            that.createCanvas();

            window.scroll(0, 0);
            that.marquee();

            return gsap.from(data.next.container, {
              duration: 0.75,
              opacity: 0
            });
          }
        },
        // blog-news
        {
          name: "blog-news",
          from: {
            namespace: ["blogPost"]
          },
          to: {
            namespace: ["news"]
          },
          leave(data) {
            return gsap.to(data.current.container, {
              duration: 0.75,
              opacity: 0,
              onComplete: () => {
                window.scroll(0, 0);
              }
            });
          },
          once(data) { },
          enter(data) {
            // that.smoothScroll = new Scroll({
            //   template: [...data.next.container.children][0],
            //   wrapper: data.next.container
            // });

            // that.customScroll();
            let dataTemplate = [...data.next.container.children][0].children;

            that.content = [...dataTemplate][1];

            that.template = that.content.getAttribute("data-template");

            that.page = that.pages[that.template];

            that.page.create();
            that.onResize();

            that.createCanvas();

            window.scroll(0, 0);
            that.marquee();

            return gsap.from(data.next.container, {
              duration: 0.75,
              opacity: 0
            });
          }
        },
        // home- services
        {
          name: "home-services",
          from: {
            namespace: ["home"]
          },
          to: {
            namespace: ["services"]
          },
          leave(data) {
            return gsap.to(data.current.container, {
              duration: 0.75,
              opacity: 0,
              onComplete: () => {
                window.scroll(0, 0);
              }
            });
          },
          once(data) { },
          enter(data) {
            // that.smoothScroll = new Scroll({
            //   template: [...data.next.container.children][0],
            //   wrapper: data.next.container
            // });

            // that.customScroll();
            let dataTemplate = [...data.next.container.children][0].children;

            that.content = [...dataTemplate][1];

            that.template = that.content.getAttribute("data-template");

            that.page = that.pages[that.template];

            that.page.create();
            that.onResize();

            window.scroll(0, 0);
            that.servicesAccordion();
            that.marquee();

            return gsap.from(data.next.container, {
              duration: 0.75,
              opacity: 0
            });
          }
        },
        // services-home
        {
          name: "services-home",
          from: {
            namespace: ["services"]
          },
          to: {
            namespace: ["home"]
          },
          leave(data) {
            return gsap.to(data.current.container, {
              duration: 0.75,
              opacity: 0,
              onComplete: () => {
                window.scroll(0, 0);
              }
            });
          },
          once(data) { },
          enter(data) {
            // that.smoothScroll = new Scroll({
            //   template: [...data.next.container.children][0],
            //   wrapper: data.next.container
            // });

            // that.customScroll();
            let dataTemplate = [...data.next.container.children][0].children;

            that.content = [...dataTemplate][1];

            that.template = that.content.getAttribute("data-template");

            that.page = that.pages[that.template];

            that.page.create();
            that.onResize();

            that.createCanvas();

            window.scroll(0, 0);
            that.marquee();

            return gsap.from(data.next.container, {
              duration: 0.75,
              opacity: 0
            });
          }
        },
        // service-home
        {
          name: "service-home",
          from: {
            namespace: ["service"]
          },
          to: {
            namespace: ["home"]
          },
          leave(data) {
            return gsap.to(data.current.container, {
              duration: 0.75,
              opacity: 0,
              onComplete: () => {
                window.scroll(0, 0);
              }
            });
          },
          once(data) { },
          enter(data) {
            // that.smoothScroll = new Scroll({
            //   template: [...data.next.container.children][0],
            //   wrapper: data.next.container
            // });

            // that.customScroll();
            let dataTemplate = [...data.next.container.children][0].children;

            that.content = [...dataTemplate][1];

            that.template = that.content.getAttribute("data-template");

            that.page = that.pages[that.template];

            that.page.create();
            that.onResize();

            that.createCanvas();

            window.scroll(0, 0);
            that.marquee();

            return gsap.from(data.next.container, {
              duration: 0.75,
              opacity: 0
            });
          }
        },
        // service- services
        {
          name: "service-services",
          from: {
            namespace: ["service"]
          },
          to: {
            namespace: ["services"]
          },
          leave(data) {
            return gsap.to(data.current.container, {
              duration: 0.75,
              opacity: 0,
              onComplete: () => {
                window.scroll(0, 0);
              }
            });
          },
          once(data) { },
          enter(data) {
            // that.smoothScroll = new Scroll({
            //   template: [...data.next.container.children][0],
            //   wrapper: data.next.container
            // });

            // that.customScroll();
            let dataTemplate = [...data.next.container.children][0].children;

            that.content = [...dataTemplate][1];

            that.template = that.content.getAttribute("data-template");

            that.page = that.pages[that.template];

            that.page.create();
            that.onResize();

            window.scroll(0, 0);
            that.servicesAccordion();
            that.marquee();

            return gsap.from(data.next.container, {
              duration: 0.75,
              opacity: 0
            });
          }
        },
        // services- service
        {
          name: "services-service",
          from: {
            namespace: ["services"]
          },
          to: {
            namespace: ["service"]
          },
          leave(data) {
            return gsap.to(data.current.container, {
              duration: 0.75,
              opacity: 0,
              onComplete: () => {
                window.scroll(0, 0);
              }
            });
          },
          once(data) { },
          enter(data) {
            // that.smoothScroll = new Scroll({
            //   template: [...data.next.container.children][0],
            //   wrapper: data.next.container
            // });

            // that.customScroll();
            let dataTemplate = [...data.next.container.children][0].children;

            that.content = [...dataTemplate][1];

            that.template = that.content.getAttribute("data-template");

            that.page = that.pages[that.template];

            that.page.create();
            that.onResize();

            window.scroll(0, 0);
            that.marquee();

            return gsap.from(data.next.container, {
              duration: 0.75,
              opacity: 0
            });
          }
        },
        // service-about
        {
          name: "service-about",
          from: {
            namespace: ["service"]
          },
          to: {
            namespace: ["about"]
          },
          leave(data) {
            return gsap.to(data.current.container, {
              duration: 0.75,
              opacity: 0,
              onComplete: () => {
                window.scroll(0, 0);
              }
            });
          },
          once(data) { },
          enter(data) {
            // that.smoothScroll = new Scroll({
            //   template: [...data.next.container.children][0],
            //   wrapper: data.next.container
            // });

            // that.customScroll();
            let dataTemplate = [...data.next.container.children][0].children;

            that.content = [...dataTemplate][1];

            that.template = that.content.getAttribute("data-template");

            that.page = that.pages[that.template];

            that.page.create();
            that.onResize();

            window.scroll(0, 0);
            that.marquee();

            return gsap.from(data.next.container, {
              duration: 0.75,
              opacity: 0
            });
          }
        },
        // service-careers
        {
          name: "service-careers",
          from: {
            namespace: ["service"]
          },
          to: {
            namespace: ["careers"]
          },
          leave(data) {
            return gsap.to(data.current.container, {
              duration: 0.75,
              opacity: 0,
              onComplete: () => {
                window.scroll(0, 0);
              }
            });
          },
          once(data) { },
          enter(data) {
            // that.smoothScroll = new Scroll({
            //   template: [...data.next.container.children][0],
            //   wrapper: data.next.container
            // });

            // that.customScroll();
            let dataTemplate = [...data.next.container.children][0].children;

            that.content = [...dataTemplate][1];

            that.template = that.content.getAttribute("data-template");

            that.page = that.pages[that.template];

            that.page.create();
            that.onResize();

            window.scroll(0, 0);
            that.marquee();

            return gsap.from(data.next.container, {
              duration: 0.75,
              opacity: 0
            });
          }
        },
        // service-contacts
        {
          name: "service-contacts",
          from: {
            namespace: ["service"]
          },
          to: {
            namespace: ["contacts"]
          },
          leave(data) {
            return gsap.to(data.current.container, {
              duration: 0.75,
              opacity: 0,
              onComplete: () => {
                window.scroll(0, 0);
              }
            });
          },
          once(data) { },
          enter(data) {
            // that.smoothScroll = new Scroll({
            //   template: [...data.next.container.children][0],
            //   wrapper: data.next.container
            // });

            // that.customScroll();
            let dataTemplate = [...data.next.container.children][0].children;

            that.content = [...dataTemplate][1];

            that.template = that.content.getAttribute("data-template");

            that.page = that.pages[that.template];

            that.page.create();
            that.onResize();

            window.scroll(0, 0);
            that.marquee();

            return gsap.from(data.next.container, {
              duration: 0.75,
              opacity: 0
            });
          }
        },
        // service-news
        {
          name: "service-news",
          from: {
            namespace: ["service"]
          },
          to: {
            namespace: ["news"]
          },
          leave(data) {
            return gsap.to(data.current.container, {
              duration: 0.75,
              opacity: 0,
              onComplete: () => {
                window.scroll(0, 0);
              }
            });
          },
          once(data) { },
          enter(data) {
            // that.smoothScroll = new Scroll({
            //   template: [...data.next.container.children][0],
            //   wrapper: data.next.container
            // });

            // that.customScroll();
            let dataTemplate = [...data.next.container.children][0].children;

            that.content = [...dataTemplate][1];

            that.template = that.content.getAttribute("data-template");

            that.page = that.pages[that.template];

            that.page.create();
            that.onResize();

            window.scroll(0, 0);
            that.marquee();

            return gsap.from(data.next.container, {
              duration: 0.75,
              opacity: 0
            });
          }
        },
        // news-service
        {
          name: "news-service",
          from: {
            namespace: ["news"]
          },
          to: {
            namespace: ["service"]
          },
          leave(data) {
            return gsap.to(data.current.container, {
              duration: 0.75,
              opacity: 0,
              onComplete: () => {
                window.scroll(0, 0);
              }
            });
          },
          once(data) { },
          enter(data) {
            // that.smoothScroll = new Scroll({
            //   template: [...data.next.container.children][0],
            //   wrapper: data.next.container
            // });

            // that.customScroll();
            let dataTemplate = [...data.next.container.children][0].children;

            that.content = [...dataTemplate][1];

            that.template = that.content.getAttribute("data-template");

            that.page = that.pages[that.template];

            that.page.create();
            that.onResize();

            window.scroll(0, 0);
            that.marquee();

            return gsap.from(data.next.container, {
              duration: 0.75,
              opacity: 0
            });
          }
        },
        // contacts-service
        {
          name: "contacts-service",
          from: {
            namespace: ["contacts"]
          },
          to: {
            namespace: ["service"]
          },
          leave(data) {
            return gsap.to(data.current.container, {
              duration: 0.75,
              opacity: 0,
              onComplete: () => {
                window.scroll(0, 0);
              }
            });
          },
          once(data) { },
          enter(data) {
            // that.smoothScroll = new Scroll({
            //   template: [...data.next.container.children][0],
            //   wrapper: data.next.container
            // });

            // that.customScroll();
            let dataTemplate = [...data.next.container.children][0].children;

            that.content = [...dataTemplate][1];

            that.template = that.content.getAttribute("data-template");

            that.page = that.pages[that.template];

            that.page.create();
            that.onResize();

            window.scroll(0, 0);
            that.marquee();

            return gsap.from(data.next.container, {
              duration: 0.75,
              opacity: 0
            });
          }
        },
        // careers-service
        {
          name: "careers-service",
          from: {
            namespace: ["careers"]
          },
          to: {
            namespace: ["service"]
          },
          leave(data) {
            return gsap.to(data.current.container, {
              duration: 0.75,
              opacity: 0,
              onComplete: () => {
                window.scroll(0, 0);
              }
            });
          },
          once(data) { },
          enter(data) {
            // that.smoothScroll = new Scroll({
            //   template: [...data.next.container.children][0],
            //   wrapper: data.next.container
            // });

            // that.customScroll();
            let dataTemplate = [...data.next.container.children][0].children;

            that.content = [...dataTemplate][1];

            that.template = that.content.getAttribute("data-template");

            that.page = that.pages[that.template];

            that.page.create();
            that.onResize();

            window.scroll(0, 0);
            that.marquee();

            return gsap.from(data.next.container, {
              duration: 0.75,
              opacity: 0
            });
          }
        },
        // about-service
        {
          name: "about-service",
          from: {
            namespace: ["about"]
          },
          to: {
            namespace: ["service"]
          },
          leave(data) {
            return gsap.to(data.current.container, {
              duration: 0.75,
              opacity: 0,
              onComplete: () => {
                window.scroll(0, 0);
              }
            });
          },
          once(data) { },
          enter(data) {
            // that.smoothScroll = new Scroll({
            //   template: [...data.next.container.children][0],
            //   wrapper: data.next.container
            // });

            // that.customScroll();
            let dataTemplate = [...data.next.container.children][0].children;

            that.content = [...dataTemplate][1];

            that.template = that.content.getAttribute("data-template");

            that.page = that.pages[that.template];

            that.page.create();
            that.onResize();

            window.scroll(0, 0);
            that.marquee();

            return gsap.from(data.next.container, {
              duration: 0.75,
              opacity: 0
            });
          }
        },
        // home-service
        {
          name: "home-service",
          from: {
            namespace: ["home"]
          },
          to: {
            namespace: ["service"]
          },
          leave(data) {
            return gsap.to(data.current.container, {
              duration: 0.75,
              opacity: 0,
              onComplete: () => {
                window.scroll(0, 0);
              }
            });
          },
          once(data) { },
          enter(data) {
            // that.smoothScroll = new Scroll({
            //   template: [...data.next.container.children][0],
            //   wrapper: data.next.container
            // });

            // that.customScroll();
            let dataTemplate = [...data.next.container.children][0].children;

            that.content = [...dataTemplate][1];

            that.template = that.content.getAttribute("data-template");

            that.page = that.pages[that.template];

            that.page.create();
            that.onResize();

            window.scroll(0, 0);
            that.marquee();

            return gsap.from(data.next.container, {
              duration: 0.75,
              opacity: 0
            });
          }
        },
        // services-about
        {
          name: "services-about",
          from: {
            namespace: ["services"]
          },
          to: {
            namespace: ["about"]
          },
          leave(data) {
            return gsap.to(data.current.container, {
              duration: 0.75,
              opacity: 0,
              onComplete: () => {
                window.scroll(0, 0);
              }
            });
          },
          once(data) { },
          enter(data) {
            // that.smoothScroll = new Scroll({
            //   template: [...data.next.container.children][0],
            //   wrapper: data.next.container
            // });

            // that.customScroll();
            let dataTemplate = [...data.next.container.children][0].children;

            that.content = [...dataTemplate][1];

            that.template = that.content.getAttribute("data-template");

            that.page = that.pages[that.template];

            that.page.create();
            that.onResize();

            window.scroll(0, 0);
            that.marquee();

            return gsap.from(data.next.container, {
              duration: 0.75,
              opacity: 0
            });
          }
        },
        // services-careers
        {
          name: "services-careers",
          from: {
            namespace: ["services"]
          },
          to: {
            namespace: ["careers"]
          },
          leave(data) {
            return gsap.to(data.current.container, {
              duration: 0.75,
              opacity: 0,
              onComplete: () => {
                window.scroll(0, 0);
              }
            });
          },
          once(data) { },
          enter(data) {
            // that.smoothScroll = new Scroll({
            //   template: [...data.next.container.children][0],
            //   wrapper: data.next.container
            // });

            // that.customScroll();
            let dataTemplate = [...data.next.container.children][0].children;

            that.content = [...dataTemplate][1];

            that.template = that.content.getAttribute("data-template");

            that.page = that.pages[that.template];

            that.page.create();
            that.onResize();

            window.scroll(0, 0);
            that.marquee();

            return gsap.from(data.next.container, {
              duration: 0.75,
              opacity: 0
            });
          }
        },
        // services-contacts
        {
          name: "services-contacts",
          from: {
            namespace: ["services"]
          },
          to: {
            namespace: ["contacts"]
          },
          leave(data) {
            return gsap.to(data.current.container, {
              duration: 0.75,
              opacity: 0,
              onComplete: () => {
                window.scroll(0, 0);
              }
            });
          },
          once(data) { },
          enter(data) {
            // that.smoothScroll = new Scroll({
            //   template: [...data.next.container.children][0],
            //   wrapper: data.next.container
            // });

            // that.customScroll();
            let dataTemplate = [...data.next.container.children][0].children;

            that.content = [...dataTemplate][1];

            that.template = that.content.getAttribute("data-template");

            that.page = that.pages[that.template];

            that.page.create();
            that.onResize();

            window.scroll(0, 0);
            that.marquee();

            return gsap.from(data.next.container, {
              duration: 0.75,
              opacity: 0
            });
          }
        },
        // services-news
        {
          name: "services-news",
          from: {
            namespace: ["services"]
          },
          to: {
            namespace: ["news"]
          },
          leave(data) {
            return gsap.to(data.current.container, {
              duration: 0.75,
              opacity: 0,
              onComplete: () => {
                window.scroll(0, 0);
              }
            });
          },
          once(data) { },
          enter(data) {
            // that.smoothScroll = new Scroll({
            //   template: [...data.next.container.children][0],
            //   wrapper: data.next.container
            // });

            // that.customScroll();
            let dataTemplate = [...data.next.container.children][0].children;

            that.content = [...dataTemplate][1];

            that.template = that.content.getAttribute("data-template");

            that.page = that.pages[that.template];

            that.page.create();
            that.onResize();

            window.scroll(0, 0);
            that.marquee();

            return gsap.from(data.next.container, {
              duration: 0.75,
              opacity: 0
            });
          }
        },
        // about-services
        {
          name: "about-services",
          from: {
            namespace: ["about"]
          },
          to: {
            namespace: ["services"]
          },
          leave(data) {
            return gsap.to(data.current.container, {
              duration: 0.75,
              opacity: 0,
              onComplete: () => {
                window.scroll(0, 0);
              }
            });
          },
          once(data) { },
          enter(data) {
            // that.smoothScroll = new Scroll({
            //   template: [...data.next.container.children][0],
            //   wrapper: data.next.container
            // });

            // that.customScroll();
            let dataTemplate = [...data.next.container.children][0].children;

            that.content = [...dataTemplate][1];

            that.template = that.content.getAttribute("data-template");

            that.page = that.pages[that.template];

            that.page.create();
            that.onResize();

            window.scroll(0, 0);
            that.servicesAccordion();
            that.marquee();

            return gsap.from(data.next.container, {
              duration: 0.75,
              opacity: 0
            });
          }
        },
        // news-services
        {
          name: "news-services",
          from: {
            namespace: ["news"]
          },
          to: {
            namespace: ["services"]
          },
          leave(data) {
            return gsap.to(data.current.container, {
              duration: 0.75,
              opacity: 0,
              onComplete: () => {
                window.scroll(0, 0);
              }
            });
          },
          once(data) { },
          enter(data) {
            // that.smoothScroll = new Scroll({
            //   template: [...data.next.container.children][0],
            //   wrapper: data.next.container
            // });

            // that.customScroll();
            let dataTemplate = [...data.next.container.children][0].children;

            that.content = [...dataTemplate][1];

            that.template = that.content.getAttribute("data-template");

            that.page = that.pages[that.template];

            that.page.create();
            that.onResize();

            window.scroll(0, 0);
            that.servicesAccordion();
            that.marquee();

            return gsap.from(data.next.container, {
              duration: 0.75,
              opacity: 0
            });
          }
        },
        // contacts-services
        {
          name: "contacts-services",
          from: {
            namespace: ["contacts"]
          },
          to: {
            namespace: ["services"]
          },
          leave(data) {
            return gsap.to(data.current.container, {
              duration: 0.75,
              opacity: 0,
              onComplete: () => {
                window.scroll(0, 0);
              }
            });
          },
          once(data) { },
          enter(data) {
            // that.smoothScroll = new Scroll({
            //   template: [...data.next.container.children][0],
            //   wrapper: data.next.container
            // });

            // that.customScroll();
            let dataTemplate = [...data.next.container.children][0].children;

            that.content = [...dataTemplate][1];

            that.template = that.content.getAttribute("data-template");

            that.page = that.pages[that.template];

            that.page.create();
            that.onResize();

            window.scroll(0, 0);
            that.servicesAccordion();
            that.marquee();

            return gsap.from(data.next.container, {
              duration: 0.75,
              opacity: 0
            });
          }
        },
        // careers-services
        {
          name: "careers-services",
          from: {
            namespace: ["careers"]
          },
          to: {
            namespace: ["services"]
          },
          leave(data) {
            return gsap.to(data.current.container, {
              duration: 0.75,
              opacity: 0,
              onComplete: () => {
                window.scroll(0, 0);
              }
            });
          },
          once(data) { },
          enter(data) {
            // that.smoothScroll = new Scroll({
            //   template: [...data.next.container.children][0],
            //   wrapper: data.next.container
            // });

            // that.customScroll();
            let dataTemplate = [...data.next.container.children][0].children;

            that.content = [...dataTemplate][1];

            that.template = that.content.getAttribute("data-template");

            that.page = that.pages[that.template];

            that.page.create();
            that.onResize();

            window.scroll(0, 0);
            that.servicesAccordion();
            that.marquee();

            return gsap.from(data.next.container, {
              duration: 0.75,
              opacity: 0
            });
          }
        }
      ]
    });
  }
}

new App();
