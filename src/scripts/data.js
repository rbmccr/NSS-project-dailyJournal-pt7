//fetches JSON data from local database and passes data into function
const API = {
  // the mood parent resource is added to the JSON object
  getJournalEntries () {
    return fetch("http://localhost:3000/journalEntries?_expand=mood").then(jsonData => jsonData.json()).then(data => console.log(data))
  }
}