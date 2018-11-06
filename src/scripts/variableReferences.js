/* containers */
const container = document.querySelector(".entryLog");
const header = document.getElementById("header");
const formContainer = document.getElementById("form--container");
const buttonContainer = document.getElementById("button--container");

/* journal.js form POST click listener */
let inputs = [];
let journalEntryObject = {};
//regex says expression can include letters, nums, "{}", "()", " ", ";", "-", ",", and ":"
let regex = new RegExp("^[a-zA-Z0-9(.).{.}. .,.:.;.-]*$");

/* radio button filtering */
const radioContainer = document.getElementById("radio--container");
const fantastic = document.getElementById("fantastic");
const good = document.getElementById("good");
const neutral = document.getElementById("neutral");
const poor = document.getElementById("poor");
const murphy_monday = document.getElementById("murphy-monday");
const radioButtonCollection = document.getElementsByName("mood");
let radioButtonClicked;

/* form validation */
// regex allows validation for listed profanity present
const regex_explicit = new RegExp(/[^!@#$%^&*]*(damn|shit|ass)[^!@#$%^&*]*/i);
//profanity blocker variables are initially false (no text is in the input fields)
let profanityBlocker1 = false;
let profanityBlocker2 = false;

/* dynamic form creation */
let formButton;
let conceptLabel;
let entryLabel;
let dateInput;
let conceptInput;
let entryInput;
let moodInput;

/* cache of journal entries */
// (referenced in entriesDOM.js, entriesCache.js, journal.js, and radio-buttons.js)
let cache = [];
// used to identify number of objects in database
let entryLength; // value established in entriesDOM.js and updated on POST button click in journal.js