/* DOCUMENTATION OF FILTERING METHOD AND CACHE

1. On page load, the renderJournalEntries function in entriesDOM.js assigns a value to a variable called entryLength.
   This value represents the number of objects in the database.
2. An event listener is added to the radio button container.
3. When a radio button is clicked, a for loop addresses the following items:
   - IF the cache array length is the same as the entryLength variable, that means that a POST was NOT made prior to
     filtering. The entryLength variable is incremented on each POST to demonstrate a change to the database.
       + the radio button that was clicked is identified, and the function renderCachedEntries is called
   - ELSE the radio button that was clicked is identified, and the function updateCache is called.
       + this function will GET the full database before filtering by mood and calling renderCachedEntries

Critical information for future changes:

1. If a delete method is added, then the incremented counter in the POST should be changed. If one entry is posted and one entry
   is deleted, then the length of the cached array still matches the entryLength variable (assuming entryLength is decremented on delete). 
   That means filtering won't work right since one post is now gone and a completely new one exists. The cache must eb updated.

*/

// assign click listener to radio button container
radioContainer.addEventListener("click", (e) => {
  // check if cached array length matches number of objects in database
  // if not, the database has received a new POST and a fetch is required
  // in order to update the cache array
  if (cache.length === entryLength) {
    // determine id of the radio button that was clicked
    for (i = 0; i < radioButtonCollection.length; i++) {
      if (radioButtonCollection[i].id === e.target.id) {
        radioButtonClicked = radioButtonCollection[i]; // assign radio button to Clicked variable for access to value property
        container.innerHTML = ""; // empty entryLog container
        // filter entries by mood by comparing entry object's mood property with value of button clicked
        renderCachedEntries(cache.filter(entry => entry.mood.toLowerCase() === radioButtonClicked.value.toLowerCase()));
      } else if (e.target.id === "all") { //else if will render all entries
        container.innerHTML = "";
        renderCachedEntries(cache);
        return // exit function to prevent loop from fetching radioButtonCollection.length times
      }
    }
  } else {
    for (i = 0; i < radioButtonCollection.length; i++) {
      if (radioButtonCollection[i].id === e.target.id) {
        radioButtonClicked = radioButtonCollection[i];
        container.innerHTML = "";
        updateCache(radioButtonClicked.value);
      } else if (e.target.id === "all") {
        container.innerHTML = "";
        updateCache(radioButtonClicked.value);
        return
      }
    }
  }
});