import React from "react";
import {useState, useEffect} from "react";

const getSavedValue = (key: string, initialValue: any) => {
  const storedValue = JSON.parse(localStorage.getItem(key) as string);
  return !!storedValue
    ? storedValue //Get value from local storage if it exists return
    : initialValue instanceof Function //Check if passed value is a function
    ? initialValue() //If value is a function executed return
    : initialValue; //return value
};

const useLocalStorage = (key: string, storedValue: any) => {
  // use () => getStoredValue(key, storedValue) because we do not want to call localStorage.getItem every
  // time the valuechanges
  const [value, setValue] = useState(() => getSavedValue(key, storedValue));

  // Whenever the value changes set the localStorage
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
};

export default useLocalStorage;
