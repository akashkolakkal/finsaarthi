function calculateRetirement() {
        const currentAge = parseFloat(
          document.getElementById("currentAge").value
        );
        const retirementAge = parseFloat(
          document.getElementById("retirementAge").value
        );
        const lifeExpectancy = parseFloat(
          document.getElementById("lifeExpectancy").value
        );
        const inflationRate =
          parseFloat(document.getElementById("inflationRate").value) / 100;
        const currentExpenses = parseFloat(
          document.getElementById("currentExpenses").value
        );
        const postTaxReturnRate =
          parseFloat(document.getElementById("postTaxReturnRate").value) / 100;
        const retirementCorpus = parseFloat(
          document.getElementById("retirementCorpus").value
        );
        const currentInvestmentRate =
          parseFloat(document.getElementById("currentInvestmentRate").value) /
          100;

        const yearsToRetirement = retirementAge - currentAge;
        const postRetirementYears = lifeExpectancy - retirementAge;
        const ageDifferenceMonths = postRetirementYears * 12;

        const futureExpenses =
          currentExpenses * Math.pow(1 + inflationRate, yearsToRetirement);
        const realRateOfReturn =
          (postTaxReturnRate - inflationRate) / (1 + inflationRate);
        //   Math.pow(1 + currentInvestmentRate, 1 + postTaxReturnRate) - 1;
        const Nominal =
          (12 * (Math.pow(1 + realRateOfReturn, 1 / 12) - 1)) / 12;
        const corpusRequiredAtRetirement =
          futureExpenses *
          ((1 - Math.pow(1 + Nominal, -ageDifferenceMonths)) / Nominal);
        const corpusRaisedtoYears = 
          retirementCorpus * (Math.pow((1+currentInvestmentRate), yearsToRetirement));

        const subtractFromPresentValue =
          corpusRequiredAtRetirement - corpusRaisedtoYears;
          
        const sipYearly = 
          (subtractFromPresentValue*currentInvestmentRate)/Math.pow(1+currentInvestmentRate,yearsToRetirement);

        const sipRequired =
          sipYearly / 12;
        document.getElementById("futureExpenses").innerText =
          futureExpenses.toFixed(2);
        document.getElementById("corpusRequiredAtRetirement").innerText =
          corpusRequiredAtRetirement.toFixed(2);
        document.getElementById("sipRequired").innerText =
          sipRequired.toFixed(2);
}

function calculateGoals() {
  const currentExpenses = parseFloat(
    document.getElementById("currentExpenses").value
  );
  const inflationRate =
    parseFloat(document.getElementById("inflationRate").value) / 100;
  const termInYears = parseFloat(
    document.getElementById("termInYears").value
  );
  const AmountAlreadysaved = parseFloat(
    document.getElementById("AmountAlreadysaved").value
  );
  const investmentRate =
    parseFloat(document.getElementById("investmentRate").value) / 100;

  const futureCost =
    currentExpenses * Math.pow(1 + inflationRate, termInYears);
  const termInMonths = termInYears * 12;
  const nominal = investmentRate / 12;
  const corpus =
    AmountAlreadysaved * Math.pow(1 + investmentRate, termInYears);
  const subtractfrom = futureCost - corpus;
  const savedAmountPerMonth =
    (subtractfrom * nominal) / (Math.pow(1 + nominal, termInMonths) - 1);

  document.getElementById("futureCost").innerText = futureCost.toFixed(2);
  document.getElementById("savedAmountPerMonth").innerText =
    savedAmountPerMonth.toFixed(2);
  document.getElementById("termInMonths").innerText = termInMonths;
}

function calculateInflation() {
  const currentExpenses = parseFloat(
    document.getElementById("currentExpenses").value
  );
  const inflationRate =
    parseFloat(document.getElementById("inflationRate").value) / 100;
  const termInYears = parseFloat(
    document.getElementById("termInYears").value
  );

  const futureCost =
    currentExpenses * Math.pow(1 + inflationRate, termInYears);
  const termInMonths = termInYears * 12;
  const nominal = inflationRate / 12;


  const savedAmountPerMonth = (futureCost * nominal) / (Math.pow(1 + nominal, termInMonths) - 1);

  document.getElementById("futureCost").innerText = futureCost.toFixed(2);
  document.getElementById("savedAmountPerMonth").innerText =
    savedAmountPerMonth.toFixed(2);
  // document.getElementById("termInMonths").innerText = termInMonths;
}

function calculateSip() {
  const monthlySipAmt = parseFloat(
    document.getElementById("monthlySipAmt").value
  );
  const sipInvestmentRate =
    parseFloat(document.getElementById("sipInvestmentRate").value) / 100;
  const termInYears = parseFloat(
    document.getElementById("termInYears").value
  );

  const monthlyRate = sipInvestmentRate / 12;
  const termInMonths = termInYears * 12;

  var futureValue = 0;

  for (var i = 0; i < termInMonths; i++) {
          futureValue += monthlySipAmt;
          futureValue *= (1 + monthlyRate);
  }

  // const futureCost =
  //   currentExpenses * Math.pow(1 + inflationRate, termInYears);
  // const termInMonths = termInYears * 12;
  // const savedAmountPerMonth = (futureCost * nominal) / (Math.pow(1 + nominal, termInMonths) - 1);




  document.getElementById("futureValue").innerText = futureValue.toFixed(2);
  // document.getElementById("savedAmountPerMonth").innerText =
  //   savedAmountPerMonth.toFixed(2);
  document.getElementById("termInYears").innerText = termInYears;
}
    

(function () {
  "use strict";

  // ==== Preloader
  window.onload = function () {
    window.setTimeout(fadeout, 500);
  };

  function fadeout() {
    document.querySelector(".preloader").style.opacity = "0";
    document.querySelector(".preloader").style.display = "none";
  }

  // ======= Sticky
  window.onscroll = function () {
    const header_navbar = document.querySelector(".navbar-area");
    const sticky = header_navbar.offsetTop;
    const logo = document.querySelector(".navbar-brand img");

    if (window.pageYOffset > sticky) {
      header_navbar.classList.add("sticky");
      logo.src = "assets/images/logo/logo.png";
    } else {
      header_navbar.classList.remove("sticky");
      logo.src = "assets/images/logo/logo.png";
    }

    // show or hide the back-top-top button
    const backToTop = document.querySelector(".back-to-top");
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      backToTop.style.display = "flex";
    } else {
      backToTop.style.display = "none";
    }
  };

  // ==== for menu scroll
  const pageLink = document.querySelectorAll(".page-scroll");

  pageLink.forEach((elem) => {
    elem.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(elem.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
        offsetTop: 1 - 60,
      });
    });
  });

  // section menu active
  function onScroll(event) {
    const sections = document.querySelectorAll(".page-scroll");
    const scrollPos =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;

    for (let i = 0; i < sections.length; i++) {
      const currLink = sections[i];
      const val = currLink.getAttribute("href");
      const refElement = document.querySelector(val);
      const scrollTopMinus = scrollPos + 73;
      if (
        refElement.offsetTop <= scrollTopMinus &&
        refElement.offsetTop + refElement.offsetHeight > scrollTopMinus
      ) {
        document.querySelector(".page-scroll").classList.remove("active");
        currLink.classList.add("active");
      } else {
        currLink.classList.remove("active");
      }
    }
  }

  window.document.addEventListener("scroll", onScroll);

  //===== close navbar-collapse when a  clicked
  let navbarToggler = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  document.querySelectorAll(".page-scroll").forEach((e) =>
    e.addEventListener("click", () => {
      navbarToggler.classList.remove("active");
      navbarCollapse.classList.remove("show");
    })
  );
  navbarToggler.addEventListener("click", function () {
    navbarToggler.classList.toggle("active");
  });

  // ========= glightbox
  const myGallery = GLightbox({
    href: "https://www.youtube.com/watch?v=r44RKWyfcFw",
    type: "video",
    source: "youtube", //vimeo, youtube or local
    width: 900,
    autoplayVideos: true,
  });

  //====== counter up
  const cu = new counterUp({
    start: 0,
    duration: 2000,
    intvalues: true,
    interval: 100,
    append: "+",
  });
  cu.start();

  //=====  WOW active
  new WOW().init();

  //=====  particles
  if (document.getElementById("particles-1"))
    particlesJS("particles-1", {
      particles: {
        number: {
          value: 40,
          density: {
            enable: !0,
            value_area: 4000,
          },
        },
        color: {
          value: ["#FFFFFF", "#FFFFFF", "#FFFFFF"],
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#fff",
          },
          polygon: {
            nb_sides: 5,
          },
          image: {
            src: "img/github.svg",
            width: 33,
            height: 33,
          },
        },
        opacity: {
          value: 0.15,
          random: !0,
          anim: {
            enable: !0,
            speed: 0.2,
            opacity_min: 0.15,
            sync: !1,
          },
        },
        size: {
          value: 50,
          random: !0,
          anim: {
            enable: !0,
            speed: 2,
            size_min: 5,
            sync: !1,
          },
        },
        line_linked: {
          enable: !1,
          distance: 150,
          color: "#ffffff",
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: !0,
          speed: 1,
          direction: "top",
          random: !0,
          straight: !1,
          out_mode: "out",
          bounce: !1,
          attract: {
            enable: !1,
            rotateX: 600,
            rotateY: 600,
          },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: !1,
            mode: "bubble",
          },
          onclick: {
            enable: !1,
            mode: "repulse",
          },
          resize: !0,
        },
        modes: {
          grab: {
            distance: 400,
            line_linked: {
              opacity: 1,
            },
          },
          bubble: {
            distance: 250,
            size: 0,
            duration: 2,
            opacity: 0,
            speed: 3,
          },
          repulse: {
            distance: 400,
            duration: 0.4,
          },
          push: {
            particles_nb: 4,
          },
          remove: {
            particles_nb: 2,
          },
        },
      },
      retina_detect: !0,
    });

  if (document.getElementById("particles-2"))
    particlesJS("particles-2", {
      particles: {
        number: {
          value: 40,
          density: {
            enable: !0,
            value_area: 4000,
          },
        },
        color: {
          value: ["#FFFFFF", "#FFFFFF", "#FFFFFF"],
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#fff",
          },
          polygon: {
            nb_sides: 5,
          },
          image: {
            src: "img/github.svg",
            width: 33,
            height: 33,
          },
        },
        opacity: {
          value: 0.15,
          random: !0,
          anim: {
            enable: !0,
            speed: 0.2,
            opacity_min: 0.15,
            sync: !1,
          },
        },
        size: {
          value: 50,
          random: !0,
          anim: {
            enable: !0,
            speed: 2,
            size_min: 5,
            sync: !1,
          },
        },
        line_linked: {
          enable: !1,
          distance: 150,
          color: "#ffffff",
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: !0,
          speed: 1,
          direction: "top",
          random: !0,
          straight: !1,
          out_mode: "out",
          bounce: !1,
          attract: {
            enable: !1,
            rotateX: 600,
            rotateY: 600,
          },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: !1,
            mode: "bubble",
          },
          onclick: {
            enable: !1,
            mode: "repulse",
          },
          resize: !0,
        },
        modes: {
          grab: {
            distance: 400,
            line_linked: {
              opacity: 1,
            },
          },
          bubble: {
            distance: 250,
            size: 0,
            duration: 2,
            opacity: 0,
            speed: 3,
          },
          repulse: {
            distance: 400,
            duration: 0.4,
          },
          push: {
            particles_nb: 4,
          },
          remove: {
            particles_nb: 2,
          },
        },
      },
      retina_detect: !0,
    });
  document.querySelectorAll('a:not([href="/#coming-soon"])').forEach((elem) => {
    elem.addEventListener("click", (e) => {
      document
        .querySelector(".hero-image-content:not(.alt)")
        .classList.remove("d-none");
      document.querySelector(".hero-image-content.alt").classList.add("d-none");
    });
  });
  document.querySelectorAll('a[href="/#coming-soon"]').forEach((elem) => {
    elem.addEventListener("click", (e) => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      document
        .querySelector(".hero-image-content:not(.alt)")
        .classList.add("d-none");
      document
        .querySelector(".hero-image-content.alt")
        .classList.remove("d-none");
    });
  });
})();
