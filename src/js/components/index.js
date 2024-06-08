const street = document.querySelector('[data-element="street"]')

if (street) setTimeout(initStreet, 0)

function initStreet () {
  street.addEventListener("click", () => {
    const address = street.textContent
    const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(address)}`
    window.open(mapUrl, '_blank')
  })
}