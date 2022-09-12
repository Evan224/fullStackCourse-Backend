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

const mostBloger = (blogs) => {
    let obj={};
    Object.values(blogs).forEach((blog) => {
        // Object.keys(obj).includes(blog.author)
        if (!Object.keys(obj).includes(blog.author)) {
            obj[blog.author] = 1;
        } else {
            obj[blog.author] += 1;
        }
    })
    let curBlog=0,currentAuthor;
    Object.keys(obj).forEach((item) => {
        if(obj[item]>curBlog){
            curBlog=obj[item];
            currentAuthor=item;
        }
    })
    console.log(currentAuthor,'---------',curBlog);
    return {author:currentAuthor,blogs:curBlog};
    
}

const mostBlogerLikes = (blogs) => {
    let obj={};
    Object.values(blogs).forEach((blog) => {
        // Object.keys(obj).includes(blog.author)
        if (!Object.keys(obj).includes(blog.author)) {
            obj[blog.author] = 1;
        } else {
            obj[blog.author] += 1;
        }
    })
    let curBlog=0,currentAuthor;
    Object.keys(obj).forEach((item) => {
        if(obj[item]>curBlog){
            curBlog=obj[item];
            currentAuthor=item;
        }
    })
    const likes=blogs.filter((blog)=>blog.author===currentAuthor).reduce((sum,item)=>sum+item.likes,0);
    // console.log(currentAuthor,'---------',curBlog);
    return {author:currentAuthor,likes};
    
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBloger,
    mostBlogerLikes,
}