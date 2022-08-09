function switchAddFieldCollapse() {
  document.querySelector('.add-field-wrapper > div.collapsed')
    .classList.toggle('hidden')
  document.querySelector('.add-field-wrapper > div:not(.collapsed)')
    .classList.toggle('hidden')
}
