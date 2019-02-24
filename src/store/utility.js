export const updateObject = (oldObject,currentObject) => {
    return {
        ...oldObject,
        ...currentObject
    };
};