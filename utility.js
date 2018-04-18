var dbPromise = idb.open('db-store', 1, db => {
    if (!db.objectStoreNames.contains('sync-comments')) {
        db.createObjectStore('sync-comments', {keyPath: 'id'});
    }
});

function writeData(st, data) {
    return dbPromise
        .then(function(db) {
            var tx = db.transaction(st, 'readwrite');
            var store = tx.objectStore(st);
            store.put(data);
            return tx.complete;
    });
}
  
function readAllData(st) {
    return dbPromise
        .then(function(db) {
            var tx = db.transaction(st, 'readonly');
            var store = tx.objectStore(st);
            return store.getAll();
    });
}

function deleteItemFromData(st, id) {
    dbPromise
        .then(function(db) {
            var tx = db.transaction(st, 'readwrite');
            var store = tx.objectStore(st);
            store.delete(id);
            return tx.complete;
        })
        .then(function() {
            console.log('Item deleted!');
        });
}

// function writeData(db, st, data) {
//     const tx = db.transaction(st, 'readwrite');
//     const store = tx.objectStore(st);
//     store.put(data);
//     return tx.complete;
// }

// function writeDataLoop(db, st, data) {
//     const tx = db.transaction(st, 'readwrite');
//     const store = tx.objectStore(st);
//     for (let i = 0; i < data.length; i++) {
//         store.put(data[i]);
//     }
//     return tx.complete;
// }

// function readAllData(st) {
//     return dbPromise
//         .then(function(db) {
//             const tx = db.transaction(st, 'readonly');
//             const store = tx.objectStore(st);
//             return store.getAll();
//     });
// }