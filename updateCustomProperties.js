// this will fetch us the value of specific CSS property passed(2) of a passed HTML element(1)
export const getCustomProperty = (elem , prop) => {
    return parseFloat(getComputedStyle(elem).getPropertyValue(prop)) || 0
}

// this will set the property of the element to the value passed
export const setCustomProperty = (elem, prop, value) => {
    elem.style.setProperty(prop,value)
}

// this will increase the property of the element by a certain factor
export const incrementCustomProperty = (elem , prop, factor) => {
    setCustomProperty(elem, prop, getCustomProperty(elem,prop) + factor);
}