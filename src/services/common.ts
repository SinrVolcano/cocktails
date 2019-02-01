export const responseProcess = async (url: string, options: {[key: string]: string} | null) => {
    let optionsString = options ? '?': '';
    if (options) {
        Object.keys(options).map(key => {
            optionsString = `${optionsString}${key}=${options[key]}&`
        });
    }
    const response = await fetch(url + optionsString);
    if (response.status === 200) {
        return await response.json();
    }
    return response;
}