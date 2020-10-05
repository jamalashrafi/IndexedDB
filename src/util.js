var db;

export const formatDate = (date) => {
  let years = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDay();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  return { years, month, day, hours, minutes };
};

export const loadDBSettings = () => {
  debugger;
  //let db;

  // In the following line, you should include the prefixes of implementations you want to test.
  //   window.indexedDB =
  //     window.indexedDB ||
  //     window.mozIndexedDB ||
  //     window.webkitIndexedDB ||
  //     window.msIndexedDB;
  // DON'T use "var indexedDB = ..." if you're not in a function.
  // Moreover, you may need references to some window.IDB* objects:
  window.IDBTransaction =
    window.IDBTransaction ||
    window.webkitIDBTransaction ||
    window.msIDBTransaction;
  window.IDBKeyRange =
    window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

  // Let us open our database
  const DBOpenRequest = window.indexedDB.open('taskApp', 8);

  // these two event handlers act on the database being opened successfully, or not
  DBOpenRequest.onerror = function (event) {
    //note.innerHTML += '<li>Error loading database.</li>';
    alert('DB Error');

    db = 'error';
  };

  DBOpenRequest.onsuccess = function (event) {};

  // create/upgrade the database without version checks
  DBOpenRequest.onupgradeneeded = function (event) {
    db = event.target.result;
    if (!db.objectStoreNames.contains('toDoList')) {
      // if there's no "todoList" store
      let objectStore = db.createObjectStore('toDoList', {
        keyPath: 'taskName',
      }); // create it
      objectStore.createIndex('hours', 'hours', { unique: false });
      objectStore.createIndex('minutes', 'minutes', { unique: false });
      objectStore.createIndex('day', 'day', { unique: false });
      objectStore.createIndex('month', 'month', { unique: false });
      objectStore.createIndex('years', 'years', { unique: false });

      // objectStore.createIndex('notified', 'notified', { unique: false });
    }
  };
};
