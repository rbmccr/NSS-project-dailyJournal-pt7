// fetches JSON data from local database and passes data into function
const API = {
  // the mood parent resource is added to the JSON object
  getJournalEntries () {
    return fetch("http://localhost:3000/journalEntries?_expand=mood").then(jsonData => jsonData.json())
  },

  getMoods () {
    return fetch("http://localhost:3000/moods").then(jsonData => jsonData.json())
  },

  postJournalEntry (singleObject) {
    return fetch("http://localhost:3000/journalEntries", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(singleObject)
    }).then(jsonData => jsonData.json())
  },

  // get the posted object back from the database, in order to use the expanded mood object information
  getSingleEntry (singleObject) {
    let id = singleObject.id;
    return fetch(`http://localhost:3000/journalEntries/${id}?_expand=mood`).then(jsonData => jsonData.json())
  },

  // POST then GET the single entry information to append accurately to page
  postEntryThenGetEntry (singleObject) {
    return this.postJournalEntry(singleObject).then((data) => this.getSingleEntry(data))
  }
}