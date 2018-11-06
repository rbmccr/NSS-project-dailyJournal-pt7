function updateCache(value) {
  let RadioButtonValue = value;
  //fetch all database objects and store them in cache, then call render function
  API.getJournalEntries()
    .then(entries => {
      cache = [];
      entries.forEach(entry => cache.push(entry));
      return renderCachedEntries(cache, RadioButtonValue);
    })
  // API.getJournalEntries().then(entries => renderJournalEntries(entries.filter(entry => entry.mood === radioButtonClicked.value)));
}

// Accepts array of objects and id of radio button, loops through each, passes each into 
// function, appends each return to the DOM
function renderCachedEntries(entries, RadioButtonValue) {
  // if the cache was not updated before calling this function, the button value will be undefined
  // because no button value is passed to the function in this instance
  if (RadioButtonValue === undefined) {
    entries.forEach(journalEntry => {
      container.innerHTML += makeJournalEntryComponent(journalEntry);
    });
  } else { // otherwise, the id is the radio button clicked, and the array should be filtered by mood
    let filteredArr = entries.filter(entry => entry.mood.toLowerCase() === RadioButtonValue.toLowerCase())
    filteredArr.forEach(journalEntry => {
      container.innerHTML += makeJournalEntryComponent(journalEntry);
    });
  }
}