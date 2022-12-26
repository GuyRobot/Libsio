export const imgUrlFor = function (imagePath, url = process.env.REACT_APP_SERVER_URL, holder = null) {
    if (!url || !imagePath) return holder;
    return `${url}/${imagePath}`
}