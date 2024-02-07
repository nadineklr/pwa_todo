// Define variables
let notesArray = []; // Array to store notes
let notesForm = document.querySelector("#notes-form"); // Form element
let notesTextarea = document.querySelector("#notes"); // Textarea for notes

//  update the cache with the notes array
function updateNotesCache() {
  if ("caches" in window) {
    caches.open("notes-cache").then((cache) => {
      cache.put("/notes-data", new Response(JSON.stringify(notesArray)));
    });
  }
}

// load notes from cache and display
function loadNotesFromCache() {
  if ("caches" in window) {
    caches.open("notes-cache").then((cache) => {
      cache
        .match("/notes-data")
        .then((response) => {
          if (response) {
            return response.json();
          }
          return [];
        })
        .then((data) => {
          notesArray = data;
          if (notesArray.length > 0) {
            notesTextarea.value = notesArray.join("\n"); // Assuming each item in array is a separate note
          }
        });
    });
  }
}

// Listen to changes in the textarea
notesTextarea.addEventListener("input", function () {
  // Update notes array with current content
  // slit lines
  notesArray = this.value.split("\n");
  // Update cache with new content
  updateNotesCache();
});

// On page load get data from cache
document.addEventListener("DOMContentLoaded", loadNotesFromCache);
