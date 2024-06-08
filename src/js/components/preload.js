import gsap from 'gsap';
window.addEventListener('load', function() {
  setTimeout(function() {
    const preloader = document.getElementById('preloader')
    const mainContent = document.getElementById('main-content')

    gsap.to(preloader, { duration: 1, opacity: 0, onComplete: function() {
        preloader.style.display = 'none'
      }})

    mainContent.style.display = 'block'
    gsap.fromTo(mainContent, { opacity: 0 }, { delay: .5, duration: 1, opacity: 1 })
  }, 2000)
});