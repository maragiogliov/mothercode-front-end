import { useState } from 'react';

const LocalStorage = (key, defaultValue) => {
    return useStorage(key, defaultValue, window.localStorage);
};

const useStorage = (key, defaultValue, storageObject) => {
    const [value, setValue] = useState(() => {
        const jsonValue = storageObject.getItem(key);
        if (jsonValue != null) return JSON.parse(jsonValue);

        if (typeof initialValue === 'function') {
            return defaultValue();
        } else {
            return defaultValue;
        }
    });
};
export default LocalStorage;
