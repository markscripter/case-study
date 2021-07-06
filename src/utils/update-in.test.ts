import { updateIn } from './update-in'

describe('updateIn', () => {
    it('does not mutate original object', () => {
        const object = {
            a: {
                b: 3
            }
        }
        const expected = {
            a: {
                b: 5
            }
        }
        const newObject = updateIn(['a', 'b'], 5, object)
        expect(newObject).toEqual(expected)
        expect(newObject).not.toEqual(object)
        expect(object).toEqual(object)
    })

    it('adds onto object if key is not found', () => {
        const object = {}
        const expected = {
            a: {
                b: {
                    c: 5
                }
            }
        }
        const newObject = updateIn(['a', 'b', 'c'], 5, object)
        expect(newObject).toEqual(expected)
        expect(newObject).not.toEqual(object)
        expect(object).toEqual(object)
    })
    

    it('returns expected when object keys are strings', () => {
        const object = {
            a: {
                b: 3
            }
        }
        const expected = {
            a: {
                b: 5
            }
        }

        expect(updateIn(['a', 'b'], 5, object)).toEqual(expected)
        expect(updateIn(['a', 'b'], 7, object)).not.toEqual(expected)
    })

    it('returns expected when object keys are numbers', () => {
        const object = {
            0: {
                0: 3
            }
        }
        const expected = {
            0: {
                0: 5
            }
        }

        expect(updateIn([0, 0], 5, object)).toEqual(expected)
        expect(updateIn([0, 0], 9, object)).not.toEqual(expected)
    })

    it('returns expected when object is shallow', () => {
        const object = {
            0: 9
        }
        const expected = {
            0: 5
        }

        expect(updateIn([0], 5, object)).toEqual(expected)
        expect(updateIn([0], 9, object)).not.toEqual(expected)
    })

    it('returns expected when object is deep', () => {
        const object = {
            0: {
                1: {
                    2: {
                        3: {
                            4: 5
                        }
                    }
                }
            }
        }
        const expected = {
            0: {
                1: {
                    2: {
                        3: {
                            4: 100
                        }
                    }
                }
            }
        }

        expect(updateIn([0, 1, 2, 3, 4], 100, object)).toEqual(expected)
        expect(updateIn([0, 1, 2, 3, 4], 9, object)).not.toEqual(expected)
    })

    it('only alters part of an object', () => {
        const object = {
            0: {
                1: 0,
                2: 3
            }
        }
        const expected = {
            0: {
                1: 12,
                2: 3
            }
        }

        expect(updateIn([0, 1], 12, object)).toEqual(expected)
        expect(updateIn([0, 1], 9, object)).not.toEqual(expected)
    })

    it('returns value if no path', () => {
        const object = {
            0: 1
        }
        const expected = 12

        expect(updateIn([], 12, object)).toEqual(expected)
        expect(updateIn([], 9, object)).not.toEqual(expected)
    })
})