$(function () {
    // Owl Carousel
    var owl = $("#home_slider");
    owl.owlCarousel({
      items: 1,
      margin: 10,
      loop: true,
      nav: true
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
        $(this).parent().find(".navigation__links").toggleClass("active");
        $("body").toggleClass("no-scroll")
      })


      // dropdown navbar mobile

      $(".navigation__links > div > .navigation__link").click(function(){
        $(this).parent().find("ul").toggleClass("active")
      })






  });