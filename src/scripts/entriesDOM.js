// Accepts array of objects, loops through each, passes each into 
// function, appends each return to the DOM
function renderJournalEntries(entries) {
  // IF statement is used to establish a variable to be used with cache filtering
  if (entries.length > 1) { // entries.length > 1 means that an initial GET request was made
    entryLength = entries.length; // establish initial number of objects in database. Used with radio button filters
    entries.forEach(journalEntry => {
      cache.push(journalEntry); // update cache with new entries
      container.innerHTML += makeJournalEntryComponent(journalEntry);
    });
  } else { // entries.length === 1 means that a POST request was made. Don't update the cache with local data
    entries.forEach(journalEntry => {
      container.innerHTML += makeJournalEntryComponent(journalEntry);
    });
  }
}