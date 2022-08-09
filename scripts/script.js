const notes = [
  {title: 'hello', 'content': 'no\n\nno'},
  {title: 'hello', 'content': 'no'},
  {title: 'hello', 'content': 'no'},
  {title: 'hello', 'content': 'no'},
  {title: 'hello', 'content': 'csdcksdncksal\njdscs\njskdc\nkjcsda\ncsd'},
  {title: 'hello', 'content': 'csdcksdncksal\njdscs\njskdc\nkjcsda\ncsd'},
  {title: 'hello', 'content': 'csdcksdncksal\njdscs\njskdc\nkjcsda\ncsd'},
  {title: 'hello', 'content': 'no'},
  {title: 'hello', 'content': 'no'},
  {title: 'hello', 'content': 'csdcksdncksal\njdscs\njskdc\nkjcsda\ncsd'},
  {title: 'hello', 'content': 'no'},
  {title: 'hello', 'content': 'no'},
  {title: 'hello', 'content': 'csdcksdncksal\njdscs\njskdc\nkjcsda\ncsd'},
  {title: 'hello', 'content': 'no'},
  {title: 'hello', 'content': 'csdcksdncksal\njdscs\njskdc\nkjcsda\ncsd'},
]

const addFieldWrapper = document.querySelector('.add-field-wrapper')
const collapsed = document.querySelector('.add-field-wrapper > div.collapsed')
const notCollapsed = document.querySelector('.add-field-wrapper > div:not(.collapsed)')
const notesGrid = document.querySelector('.notes-grid')

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

  updateNotesGrid()
}

function updateNotesGrid() {
  notesGrid.innerHTML = ''

  for (const note of notes) {
    notesGrid.innerHTML +=
      `<div class="note">
        <h2>${note.title}</h2>
        <pre>${note.content}</pre>
      </div>`
  }
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

updateNotesGrid()
