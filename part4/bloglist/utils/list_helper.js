const dummy = (blogs) => {
    // ...
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }

    return blogs.length === 0
        ? 0
        : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    let curObj;
    let curLikes = 0;
    Object.values(blogs).forEach((obj) => {
        if (obj.likes > curLikes) {
            curObj = obj;
            curLikes = obj.likes;
        }
    });
    return curObj;
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}