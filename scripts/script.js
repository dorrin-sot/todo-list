let notes = [
  { id: 0, title: 'study', content: 'complete angular studies' },
  { id: 1, title: 'shopping', content: 'buy a cartoon of milk' },
  { id: 2, title: 'coding', content: 'complete codestar project phase' },
  // { id: 3, title: 'chores', content: 'vacuum my room.\nmake dinner' },
  // { id: 4, title: 'excercise', content: '30 minutes' },
  // { id: 5, title: 'visit your friend', content: '9pm' },
  // { id: 6, title: 'hello', content: 'csdcksdncksal\njdscs\njskdc\nkjcsda\ncsd' },
]

const addFieldWrapper = document.querySelector('.add-field-wrapper')
const collapsed = document.querySelector('.add-field-wrapper > div.collapsed')
const notCollapsed = document.querySelector('.add-field-wrapper > div:not(.collapsed)')
const notesGrid = document.querySelector('.notes-grid')
const keyListener = document.getElementById('key-listener');
let keyListenerTimeout = null;

function switchAddFieldCollapse() {
  collapsed.classList.toggle('hidden')
  notCollapsed.classList.toggle('hidden')

  if (!notCollapsed.classList.contains('hidden')) {
    notCollapsed.querySelector('#title').focus()
  }
}

function saveListAndClearListUI() {
  const title = notCollapsed.querySelector('#title');
  const noteContent = notCollapsed.querySelector('#note > textarea');

  if (!!title.value || !!noteContent.value) {
    notesGrid.classList.remove('empty')
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

  for (const { id, title, content } of notes) {
    notesGrid.innerHTML +=
      `<div class="note-wrapper" id="note-${id}" tabindex="0">
        <div class="note">
          <h2>${title}</h2>
          <pre>${content}</pre>
        </div>
        <div class="overlay">
          <button class="icon-button" onclick="deleteNote(${id})" title="Delete note">
            <i class="far fa-trash-can"></i>
          </button>
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

collapsed.addEventListener('keydown', ({ key }) => {
  if (key === 'Enter') switchAddFieldCollapse()
})

document.addEventListener('keyup', (event) => {
  const { key, target: { id } } = event

  const collapsedIsShown = !collapsed.classList.contains('hidden')

  if (collapsedIsShown) {
    if (key.toLowerCase() === 'a') {
      switchAddFieldCollapse()
    }
  } else {
    key === 'Escape' && switchAddFieldCollapse()
  }

  if (key.toLowerCase() === 'd' && id.startsWith('note-')) {
    deleteNote(Number.parseInt(id.split('-')[1]))
  }
})

document.addEventListener('click', ({ target }) => {
  if (!addFieldWrapper.contains(target)) {
    if (collapsed.classList.contains('hidden')) {
      switchAddFieldCollapse()
    }
  }
})

document.addEventListener('keydown', ({ key }) => {
  keyListenerTimeout && clearTimeout(keyListenerTimeout);
  keyListener.innerHTML = key.toUpperCase();
  keyListener.style.fontSize = key.length > 3 ? '2rem' : '5rem';

  keyListener.style.opacity = '.8';
  keyListenerTimeout = setTimeout(() => {
    keyListener.style.opacity = '0';
    keyListenerTimeout = null;
  }, 600);
});

updateNotesGrid()
