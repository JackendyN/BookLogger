const DB_NAME = "book-logger";
const DB_VERSION = 1;
const STORE_NAME = "book-covers";
function openDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        request.onupgradeneeded = () => {
            const db = request.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME);
            }
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}
export const saveCover = async (coverId, imageFile) => {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, "readwrite");
        const store = transaction.objectStore(STORE_NAME);
        store.put(imageFile, coverId);
        transaction.oncomplete = () => {
            db.close();
            resolve();
        };
        transaction.onerror = () => {
            db.close();
            reject(transaction.error);
        };
    });
};
export const getCover = async (coverId) => {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, "readonly");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.get(coverId);
        request.onsuccess = () => {
            db.close();
            const imageFile = request.result;
            if (!imageFile) {
                resolve(null);
                return;
            }
            resolve(URL.createObjectURL(imageFile));
        };
        request.onerror = () => {
            db.close();
            reject(request.error);
        };
    });
};
export const deleteCover = async (coverId) => {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, "readwrite");
        const request = transaction.objectStore(STORE_NAME).delete(coverId);
        request.onsuccess = () => {
            db.close();
            resolve(true);
        };
        request.onerror = () => {
            db.close;
            resolve(false);
        };
    });
};
