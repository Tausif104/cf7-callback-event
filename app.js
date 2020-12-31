const submitForm = document.querySelector('#wpcf7-f301-o1')
const popUp = document.querySelector('.popup-contact-form')
const closePopUp = document.querySelector('.close-contact-popup')

submitForm.addEventListener(
    'wpcf7mailsent',
    (e) => {
        popUp.classList.add('active')
    },
    false
)

closePopUp.addEventListener('click', () => {
    popUp.classList.remove('active')
})
