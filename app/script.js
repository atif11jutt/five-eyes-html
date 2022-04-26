$(function () {
    // Owl Carousel
    var owl = $("#home_slider");
    owl.owlCarousel({
      items: 1,
      margin: 10,
      loop: true,
      nav: true,
      autoplay:true,
      autoplayTimeout: 5000,
      autoplaySpeed: 1300
    });


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


    // partners
    var owl3 = $("#partners_slider");
    owl3.owlCarousel({
      items: 4,
      margin: 40,
      autoplay:true,
      autoplayTimeout: 2500,
      autoplaySpeed: 800,
      loop: true,
      nav: false,
      responsiveClass: true,
      responsive: {
        0: {
          items: 3,
          margin: 20
        },

        600: {
          items: 4,
          margin: 30
        },

        1024: {
          items: 5
        },

        1366: {
          items: 6
        }
      }
    });



    $(".servicess__categories__box").click(function(){
        $(this).siblings().removeClass("category--activated");
        $(this).addClass("category--activated")
        var target = $(this).data('target');
        $(target).siblings().removeClass("active--grid")
        $(target).addClass("active--grid")
      })



      // navbar

      $("#hamburger").click(function(e){
        e.preventDefault();
        $("#mobile_navigation").addClass("active");
        $("body").addClass("no-scroll")
      })
      
      $("#hamburger-close").click(function(e){
        e.preventDefault();
        $("#mobile_navigation").removeClass("active");
        $("body").removeClass("no-scroll")
      })


      // dropdown navbar mobile

      $(".navigation__links > div > .navigation__link").click(function(){
        $(this).parent().find("ul").toggleClass("active")
      })


      // scroll down

      var page_height = $(window).height();

      $(".home__arrow, .about__arrow").click(function(){
        $("html, body").animate({
          scrollTop: page_height
      }, 1000);
      
      })





  });