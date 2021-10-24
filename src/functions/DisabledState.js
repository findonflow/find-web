import { atom, useAtom } from "react-atomic-state";

//This enables state management for forms (enabled/disabled)
//you must call this from a fieldset for each form on the site

const formStatus = atom(false);
export const disableForm = () => formStatus.set(true);
export const enableForm = () => formStatus.set(false);
//const unsubscribe = formStatus.subscribe((value) => {
//console.log(value); // log every update
//});
export const useFormStatus = () => useAtom(formStatus);

//This enables state management for forms (enabled/disabled)
//you must call this from a fieldset for each form on the site

const stateChanged = atom(false);

export const changeState = () => {
    if (stateChanged.get() === true)
        stateChanged.set(false)
    else
        stateChanged.set(true)

}

export const useStateChanged = () => useAtom(stateChanged);