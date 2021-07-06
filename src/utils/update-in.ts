/**
 * 
 * @param path {array} - An array of keys that make a path to the item that needs updating
 * @param value {any} - The updated value.
 * @param obj {object} - The object you want to update
 * @returns A new object that is updated, or the value if no path found
 */
export function updateIn(path: KeyTypeArray, value: any, obj: ObjType = {}): ObjType {
    if (path.length) {
        const key = path[0]
        return {
            ...obj,
            [key]: updateIn(path.slice(1), value, obj[key])
        }
    }
    return value
}
