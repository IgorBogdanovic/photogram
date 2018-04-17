var dbPromise = idb.open('db-store', 1, db => {
    if (!db.objectStoreNames.contains('users')) {
        db.createObjectStore('users', {keyPath: 'id'});
    }
    if (!db.objectStoreNames.contains('posts')) {
        db.createObjectStore('posts', {keyPath: 'id'});
    }
    if (!db.objectStoreNames.contains('comments')) {
        db.createObjectStore('comments', {keyPath: 'id'});
    }
    if (!db.objectStoreNames.contains('likes')) {
        db.createObjectStore('likes', {keyPath: 'id'});
    }
    if (!db.objectStoreNames.contains('followers')) {
        db.createObjectStore('followers', {keyPath: 'id'});
    }
    if (!db.objectStoreNames.contains('followings')) {
        db.createObjectStore('followings', {keyPath: 'id'});
    }
    if (!db.objectStoreNames.contains('search')) {
        db.createObjectStore('search', {keyPath: 'id'});
    }
});

function writeData(db, st, data) {
    const tx = db.transaction(st, 'readwrite');
    const store = tx.objectStore(st);
    store.put(data);
    return tx.complete;
}

function writeDataLoop(db, st, data) {
    const tx = db.transaction(st, 'readwrite');
    const store = tx.objectStore(st);
    for (let i = 0; i < data.length; i++) {
        store.put(data[i]);
    }
    return tx.complete;
}

function readAllData(st) {
    return dbPromise
        .then(function(db) {
            const tx = db.transaction(st, 'readonly');
            const store = tx.objectStore(st);
            return store.getAll();
    });
}
