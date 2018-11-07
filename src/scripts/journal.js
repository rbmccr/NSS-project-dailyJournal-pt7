// immediately GET and display journal entries in the database
API.getJournalEntries().then(entries => renderJournalEntries(entries));

//this function posts form information to the database, assuming all requirements are met
function activateButton() {
    formButton.addEventListener("click", (e) => {
        let idx0 = dateInput.value;
        let idx1 = conceptInput.value.slice(0,20); //conceptInput only takes 20 characters
        let idx2 = entryInput.value;
        let idx3 = Number(moodInput.value); //ensures value is not treated as string

        inputs = [idx0, idx1, idx2, idx3];
        //if any of the inputs have profanity, don't meet the regex, are blank, or are undefined, don't move on the the POST
        for (i = 0; i < inputs.length; i++) {
            if (profanityBlocker1 === true || profanityBlocker2 === true || !regex.test(inputs[i]) || inputs[i] === "" || inputs[i] === undefined) {
                alert("Please complete the form entry fields completely and correctly.");
                return
            }
        }
        //build the journal entry object using input values stored in the array above
        journalEntryObject = {
            date: inputs[0],
            concept: inputs[1],
            entry: inputs[2],
            moodId: inputs[3]
        };
        fetch("http://localhost:3000/journalEntries", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(journalEntryObject)

        /* ---------------- FIX ISSUE HERE ----------------- 
          - renew cache here?
          - move post function to data.js
          - attribute moodId to mood label by fetching entries
        */

        }).then(jsonData => jsonData.json())
        //display new journal entry on page
        .then(data => {
            let holdMyObject = []; //holds single object
            holdMyObject.push(data);
            renderJournalEntries(holdMyObject);
            entryLength++; // increment counter to show additional object in database. Affects radio button filtering
        });
        dateInput.value = "";
        conceptInput.value = "";
        entryInput.value = "";
        moodInput.value = "Fantastic";
    });
}
