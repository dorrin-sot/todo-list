const notes = []

const addFieldWrapper = document.querySelector('.add-field-wrapper')
const collapsed = document.querySelector('.add-field-wrapper > div.collapsed')
const notCollapsed = document.querySelector('.add-field-wrapper > div:not(.collapsed)')

function switchAddFieldCollapse() {
  collapsed.classList.toggle('hidden')
  notCollapsed.classList.toggle('hidden')
}

function saveListAndClearListUI() {
  const title = notCollapsed.querySelector('#title');
  const noteContent = notCollapsed.querySelector('#note > textarea');

  if (!!title.value || !!noteContent.value) {
    notes.push({
      title: title.value,
      content: noteContent.value
    })
  }

  title.value = ''
  noteContent.value = ''
}

function addList() {
  saveListAndClearListUI()
  switchAddFieldCollapse()
  console.log(notes)
}

document.addEventListener('click', ({target}) => {
  if (!addFieldWrapper.contains(target)) {
    if (collapsed.classList.contains('hidden')) {
      switchAddFieldCollapse()
    }
  }
})
