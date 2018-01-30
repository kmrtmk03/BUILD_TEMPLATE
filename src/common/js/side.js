const Prefix = 'Side'

//get element
const SideWrap = document.getElementById(`${ Prefix }-Wrap`)
const SideButton = document.getElementById(`${ Prefix }-Button`)

//sidebar toggle
SideButton.addEventListener('click', () => {
    SideWrap.classList.toggle(`${ Prefix }-Wrap--Open`)
})
