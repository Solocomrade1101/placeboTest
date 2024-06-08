import gsap from 'gsap';

gsap.registerPlugin(ScrollTrigger)
if (ScrollTrigger.isTouch !== 1) {

  gsap.fromTo('.logo-1', { y: 0, opacity:1 }, {
    y: 300,
    opacity: 0,
    scrollTrigger: {
      trigger: '.header',
      start: '0',
      end: '300',
      scrub: true,
    }
  })

  gsap.fromTo('.madame', { y: -200, opacity:0 }, {
    y: -200,
    opacity: 1,
    scrollTrigger: {
      trigger: '.header',
      start: '0',
      end: '200',
      scrub: true,
    }
  })
  gsap.fromTo('.madame', { y: -200}, {
    y: 200,
    scrollTrigger: {
      trigger: '.header',
      start: '200',
      end: '1200',
      scrub: true,
    }
  })

  gsap.fromTo('.madame__fill', { opacity: 0, width: 0}, {
    opacity: 1,
    width: 'auto',
    scrollTrigger: {
      trigger: '.header',
      start: '200',
      end: '1200',
      scrub: true,
    }
  })

  const madameName = document.querySelector('.madame__name');
  madameName.innerHTML = madameName.textContent.split('').map(char => `<span>${char}</span>`).join('');

  const chars = document.querySelectorAll('.madame__name span');
  ScrollTrigger.create({
    trigger: '.header',
    start: '0',
    end: '1700',
    onEnter: () => {
      gsap.fromTo(chars, {opacity: 0},{
        opacity: 1,
        delay: .5,
        duration: 1.5,
        stagger: 0.1
      });
    },
    scrub: true,
  });

  gsap.fromTo('.history', { y: 300, opacity: 0}, {
    y: 0,
    opacity: 1,
    scrollTrigger: {
      trigger: '.header',
      start: '1300',
      end: '1700',
      scrub: true,
    }
  })

  gsap.fromTo('.history__portrait', { opacity: 0}, {
    opacity: 1,
    scrollTrigger: {
      trigger: '.header',
      start: '2300',
      end: '3200',
      scrub: true
    }
  })

  gsap.fromTo('.history__family', { opacity: 0}, {
    opacity: 1,
    scrollTrigger: {
      trigger: '.history__portrait',
      start: '3300',
      end: '4000',
      scrub: true
    }
  })

}