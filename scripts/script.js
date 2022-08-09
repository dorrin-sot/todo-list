let notes = [
  {id: 0, title: 'hello', 'content': 'no\n\nno'},
  {id: 1, title: 'hello', 'content': 'no'},
  {id: 2, title: 'hello', 'content': 'no'},
  {id: 3, title: 'hello', 'content': 'no'},
  {id: 4, title: 'hello', 'content': 'csdcksdncksal\njdscs\njskdc\nkjcsda\ncsd'},
  {id: 5, title: 'hello', 'content': 'csdcksdncksal\njdscs\njskdc\nkjcsda\ncsd'},
  {id: 6, title: 'hello', 'content': 'csdcksdncksal\njdscs\njskdc\nkjcsda\ncsd'},
  {id: 7, title: 'hello', 'content': 'no'},
  {id: 8, title: 'hello', 'content': 'no'},
  {id: 9, title: 'hello', 'content': 'csdcksdncksal\njdscs\njskdc\nkjcsda\ncsd'},
  // {id: 10,title: 'hello', 'content': 'no'},
  // {id: 11,title: 'hello', 'content': 'no'},
  // {id: 12,title: 'hello', 'content': 'csdcksdncksal\njdscs\njskdc\nkjcsda\ncsd'},
  // {id: 13,title: 'hello', 'content': 'no'},
  // {id: 14,title: 'hello', 'content': 'csdcksdncksal\njdscs\njskdc\nkjcsda\ncsd'},
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
    notesGrid.classList.remove('empty')
    notes.push({
      title: title.value,
      content: noteContent.value,
      id: (notes[notes.length - 1] || {id: -1}).id + 1
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
        <div class="overlay" tabindex="6">
          <i class="icon-button far fa-trash-can" onclick="deleteNote(${note.id})" tabindex="6" title="Delete note"></i>
        </div>
      </div>`
  }

  if (notesGrid.innerHTML === '') {
    notesGrid.classList.add('empty')
    notesGrid.innerHTML = `
        <img width="120" alt="Empty List Indicator" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjZmZmZmZmIj4KICA8cGF0aCBkPSJNOSAyMWMwIC41NS40NSAxIDEgMWg0Yy41NSAwIDEtLjQ1IDEtMXYtMUg5djF6bTMtMTlDOC4xNCAyIDUgNS4xNCA1IDljMCAyLjM4IDEuMTkgNC40NyAzIDUuNzRWMTdjMCAuNTUuNDUgMSAxIDFoNmMuNTUgMCAxLS40NSAxLTF2LTIuMjZjMS44MS0xLjI3IDMtMy4zNiAzLTUuNzQgMC0zLjg2LTMuMTQtNy03LTd6bTIuODUgMTEuMWwtLjg1LjZWMTZoLTR2LTIuM2wtLjg1LS42QTQuOTk3IDQuOTk3IDAgMCAxIDcgOWMwLTIuNzYgMi4yNC01IDUtNXM1IDIuMjQgNSA1YzAgMS42My0uOCAzLjE2LTIuMTUgNC4xeiIvPgo8L3N2Zz4K"/>
        <p>Notes you add appear here</p>`
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

document.addEventListener('click', ({target}) => {
  if (!addFieldWrapper.contains(target)) {
    if (collapsed.classList.contains('hidden')) {
      switchAddFieldCollapse()
    }
  }
})

collapsed.addEventListener('keydown', ({key}) => {
  if (key === 'Enter') switchAddFieldCollapse()
})

document.addEventListener('keyup', ({key}) => {
  const collapsedIsShown = !collapsed.classList.contains('hidden')

  if (collapsedIsShown) {
    if (key.toLowerCase() === 'a') {
      switchAddFieldCollapse()
      notCollapsed.querySelector('#title').focus()
    }
  } else {
    key === 'Escape' && switchAddFieldCollapse()
  }
})

updateNotesGrid()
