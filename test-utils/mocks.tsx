declare let global: { fetch: {} };

export function mockFetch<T>(data: T) {
    global.fetch = jest.fn(() => {
        return Promise.resolve({
            ok: true,
            status: 200,
            json: () => Promise.resolve(data)
        })
    })
}

export function mockFetchError() {
    global.fetch = jest.fn().mockImplementationOnce(() => {
        return {
            ok: false,
            status: 500,
            statusText: 'Server Error'
        }
    })
}