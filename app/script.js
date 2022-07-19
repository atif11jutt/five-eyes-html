$(function () {
  // Owl Carousel
  var owl = $("#home_slider");
  owl.owlCarousel({
    items: 1,
    margin: 10,
    loop: true,
    nav: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplaySpeed: 1300,
  });

  var news_slider = [
    {
      link: "/post1.html",
      image: "/assets/parlament-house.jpg",
      title: `Australia's Largest Ever Cyber Security Spend: $10bn Pledge to
        Double ASD & Ramp Up Offensive Cyber Operations`,
      para: `Australia is pledging to double its electronic spy agency and ramp up its
      offensive cyber operations with a budget of $10bn.
      The investment will see the Australian Signals Directorate (ASD) grow from its
      current size of 1,500 staff to 3,000 in the next 10 years. This is part of Australia's
      largest ever cyber security spend, which will also see an increase in funding for
      Cyber Security Operations Centres and initiatives to protect critical infrastructure.
      The ASD is responsible for collecting foreign intelligence, conducting cyber
      operations and protecting Australia's computer networks. Under the package, the
      ASD is expected to create opportunities for data analysts, computer
      programmers and software engineers in its workforce.
      This investment in Cyber Security comes at a time when Australians are
      increasingly reliant on technology and the internet. It also follows a number of
      high-profile Cyber Security incidents, including the 2016 Census hack and the
      WannaCry ransomware attack.
      Cyber security is a top priority for the Australian Government and this budget
      investment will ensure that we have the capability to protect our critical
      infrastructure and defend against cyber threats.
      This budget has been positively received for many in the Cyber Security industry
      who have been calling for increased investment in Cyber Security initiatives. In
      his address last Tuesday the National Treasurer, Scott Morrison, said the budget
      was "about making Australia's economy and our society more secure in the face
      of an increasingly complex and contested cyberspace".
      The Cyber Security package is a welcome investment in the safety of Australians
      and the protection of our critical infrastructure. It is a necessary step in ensuring
      that we can continue to enjoy the benefits of technology while keeping our data
      and systems safe from Cyber Security threats`,
    },
    // {
    //   link: "/blog-post.html",
    //   image: "/assets/news.jpg",
    //   title:
    //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit adipiscing dolor.",
    //   para: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, adipiscing ipsum dolor sit amet. Lorem ipsum dolor sit amet, consectetur adipiscing elit, adipiscing ipsum dolor sit amet.",
    // },
  ];

  for (let i = 0; i < news_slider.length; i++) {
    $("#news_slider").append(`
    <!-- ${i} -->
    <div class="item">
      <a href="${news_slider[i].link}" class="news__grid__item">
        <figure class="news__grid__item__media">
          <img class="news__grid__item__media__image" src="${news_slider[i].image}" alt="News Cover"
            crossorigin="anonymous" />
        </figure>

        <h3 class="news__grid__item__title">
        ${news_slider[i].title}
        </h3>

        <p class="news__grid__item__label" data-animation="paragraph">
        ${news_slider[i].para}
        </p>

      </a>
    </div>
    `);
  }

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
        margin: 20,
      },

      600: {
        items: 2,
        margin: 20,
      },

      1024: {
        items: 3,
      },

      1366: {
        items: 3,
      },
    },
  });

  // partners
  var owl3 = $("#partners_slider");
  owl3.owlCarousel({
    items: 4,
    margin: 40,
    autoplay: true,
    autoplayTimeout: 2500,
    autoplaySpeed: 800,
    loop: true,
    nav: false,
    responsiveClass: true,
    responsive: {
      0: {
        items: 3,
        margin: 20,
      },

      600: {
        items: 4,
        margin: 30,
      },

      1024: {
        items: 5,
      },

      1366: {
        items: 6,
      },
    },
  });

  $(".servicess__categories__box").click(function () {
    $(this).siblings().removeClass("category--activated");
    $(this).addClass("category--activated");
    var target = $(this).data("target");
    $(target).siblings().removeClass("active--grid");
    $(target).addClass("active--grid");
  });

  // navbar

  $("#hamburger").click(function (e) {
    e.preventDefault();
    $("#mobile_navigation").addClass("active");
    $("body").addClass("no-scroll");
  });

  $("#hamburger-close").click(function (e) {
    e.preventDefault();
    $("#mobile_navigation").removeClass("active");
    $("body").removeClass("no-scroll");
  });

  // dropdown navbar mobile

  $(".navigation__links > div > .navigation__link").click(function () {
    $(this).parent().find("ul").toggleClass("active");
  });

  // scroll down

  var page_height = $(window).height();

  $(".home__arrow, .about__arrow").click(function () {
    $("html, body").animate(
      {
        scrollTop: page_height,
      },
      1000
    );
  });

  // form submit
  $("#contact").on("submit", function (e) {
    e.preventDefault();

    $.ajax({
      type: "post",
      url: "form_submit.php",
      data: $("#contact").serialize(),
      success: function () {
        alert("Thanks for contacting!");
        $("#contact")[0].reset()
      },
    });
  });
});
