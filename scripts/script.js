let notes = [
  { id: 0, title: 'hello', 'content': 'no\n\nno' },
  { id: 1, title: 'hello', 'content': 'no' },
  { id: 2, title: 'hello', 'content': 'no' },
  { id: 3, title: 'hello', 'content': 'no' },
  { id: 4, title: 'hello', 'content': 'csdcksdncksal\njdscs\njskdc\nkjcsda\ncsd' },
  { id: 5, title: 'hello', 'content': 'csdcksdncksal\njdscs\njskdc\nkjcsda\ncsd' },
  { id: 6, title: 'hello', 'content': 'csdcksdncksal\njdscs\njskdc\nkjcsda\ncsd' },
  { id: 7, title: 'hello', 'content': 'no' },
  { id: 8, title: 'hello', 'content': 'no' },
  { id: 9, title: 'hello', 'content': 'csdcksdncksal\njdscs\njskdc\nkjcsda\ncsd' },
  { id: 10, title: 'hello', 'content': 'no' },
  { id: 11, title: 'hello', 'content': 'no' },
  { id: 12, title: 'hello', 'content': 'csdcksdncksal\njdscs\njskdc\nkjcsda\ncsd' },
  { id: 13, title: 'hello', 'content': 'no' },
  { id: 14, title: 'hello', 'content': 'csdcksdncksal\njdscs\njskdc\nkjcsda\ncsd' },
]

const addFieldWrapper = document.querySelector('.add-field-wrapper')
const collapsed = document.querySelector('.add-field-wrapper > div.collapsed')
const notCollapsed = document.querySelector('.add-field-wrapper > div:not(.collapsed)')
const notesGrid = document.querySelector('.notes-grid')
const keyListener = document.getElementById('key-listener');

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
      content: noteContent.value,
      id: (notes[notes.length - 1] || { id: -1 }).id + 1
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
      `<div class="note-wrapper">
        <div class="note">
          <h2>${note.title}</h2>
          <pre>${note.content}</pre>
        </div>
        <div class="overlay">
          <i class="icon-button far fa-trash-can" onclick="deleteNote(${note.id})"></i>
        </div>
      </div>`
  }
}

function deleteNote(id) {
  notes = notes.filter((n) => n.id !== id)
  updateNotesGrid()
}

function addList() {
  saveListAndClearListUI()
  switchAddFieldCollapse()
  console.log(notes)
}

document.addEventListener('click', ({ target }) => {
  if (!addFieldWrapper.contains(target)) {
    if (collapsed.classList.contains('hidden')) {
      switchAddFieldCollapse()
    }
  }
})

document.addEventListener('keydown', ({ key }) => {
  keyListener.innerHTML = key;
  if (key.length >=)
});

updateNotesGrid()
