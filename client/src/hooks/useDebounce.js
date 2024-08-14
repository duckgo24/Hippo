import React, {useState, useEffect} from 'react';

function useDebouce(value, delay) {

    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);


    return debouncedValue;

}

export default useDebouce;