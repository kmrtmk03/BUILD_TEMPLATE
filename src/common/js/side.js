//get element
const SideWrap = document.getElementById('Side-Wrap')
const SideButton = document.getElementById('Side-Button')

//sidebar toggle
SideButton.addEventListener('click', () => {
    SideWrap.classList.toggle('Side-Wrap--Open')
})
