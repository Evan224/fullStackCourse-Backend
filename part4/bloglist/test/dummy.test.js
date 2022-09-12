const listHelper=require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []
  
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })

  describe('total likes', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a6',
        title: 'Not titled',
        author: 'HSAIODH',
        url: 'http://www.ations/Go_To_Considered_Harmful.html',
        likes: 2,
        __v: 0
      }
    ]
  
    test('when list has only one blog, equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      expect(result).toBe(2)
    })

    const listWithMultipleBlogs = [
      {
        _id: '5a422aa71b52134a6',
        title: 'Not titled2',
        author: 'HSAIOD123H',
        url: 'http://www.ations/Go_To_Considered_Harmful.html',
        likes: 3,
        __v: 0
      },
      {
        _id: '5a422aa71b54a6',
        title: 'Not titled32',
        author: 'HSAIODH213',
        url: 'http://www.ations/Go_To_Considered_Harmful.html',
        likes: 202,
        __v: 0
      },
      {
        _id: '5a422aa71b2254a6',
        title: 'Not tit222led',
        author: 'HSAIODH123123',
        url: 'http://www.ations/Go_To_Considered_Harmful.html',
        likes: 22,
        __v: 0
      }
    ]

    test('when list has only one blog, equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithMultipleBlogs)
      expect(result).toBe(227)
    })
  })

  describe("most likes", () => {
    
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a6',
        title: 'Not titled',
        author: 'HSAIODH',
        likes:2,
      },
      {
        _id: '5a422aa71b54a6',
        title: 'Not titled',
        author: 'HSAIODH',
        likes:2,
      },
      {
        _id: '5a422aa71b54a6',
        title: 'Not titled',
        author: 'HSAIODH',
        likes:21,
      },
      {
        _id: '5a422aa71b54a6',
        title: 'Not titled',
        author: 'HSAIODH',
        likes:22,
      },
      {
        _id: '5a422aa71b54a6',
        title: 'Not titled',
        author: 'HSAIODH',
        likes:200,
      },
      {
        _id: '5a422aa71b54a6',
        title: 'Not titled',
        author: 'HSAIODH',
        likes:20,
      },
    ]
    test("when list has only one blog, equals the likes of that", () => {
      const result = listHelper.favoriteBlog(listWithOneBlog);
      expect(result).toEqual(listWithOneBlog[4]);
    });
  });

  describe("most bloger", () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a6',
        title: 'Not titled',
        author: 'HSAIODH',
        url: 'http://www.ations/Go_To_Considered_Harmful.html',
        likes: 2,
        __v: 0
      }
    ]

    const listWithManyBlog = [
      {
        _id: '5a422aa71b54a6',
        title: 'Not titled',
        likes:2,
        author:"Evan3"
      },
      {
        _id: '5a422aa71b54a6',
        title: 'Not titled',
        likes:2,
        author:"Evan7"
      },
      {
        _id: '5a422aa71b54a6',
        title: 'Not titled',
        likes:2,
        author:"Evan1"
      },
      {
        _id: '5a422aa71b54a6',
        title: 'Not titled',
        likes:2,
        author:"Evan1"
      },
      {
        _id: '5a422aa71b54a6',
        title: 'Not titled',
        likes:2,
        author:"Evan1"
      },
      {
        _id: '5a422aa71b54a6',
        title: 'Not titled',
        likes:2,
        author:"Evan1"
      },
      {
        _id: '5a422aa71b54a6',
        title: 'Not titled',
        likes:2,
        author:"Evan4"
      },
      {
        _id: '5a422aa71b54a6',
        title: 'Not titled',
        likes:2,
        author:"Evan3"
      },
      {
        _id: '5a422aa71b54a6',
        title: 'Not titled',
        likes:2,
        author:"Evan2"
      },
      {
        _id: '5a422aa71b54a6',
        title: 'Not titled',
        likes:2,
        author:"Evan2"
      },
    ]
    test("when list has only one blog, equals the likes of that", () => {
      const result = listHelper.mostBloger(listWithOneBlog);
      expect(result).toEqual({author:"HSAIODH",blogs:1});
    });

    test("when list has many blogs, equals the likes of that", () => {
      const result = listHelper.mostBloger(listWithManyBlog);
      expect(result).toEqual({author:"Evan1",blogs:4});
    });
  });

  describe("most bloger likes", () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a6',
        title: 'Not titled',
        author: 'HSAIODH',
        url: 'http://www.ations/Go_To_Considered_Harmful.html',
        likes: 2,
        __v: 0
      }
    ]

    const listWithManyBlog = [
      {
        _id: '5a422aa71b54a6',
        title: 'Not titled',
        likes:2,
        author:"Evan3"
      },
      {
        _id: '5a422aa71b54a6',
        title: 'Not titled',
        likes:2,
        author:"Evan7"
      },
      {
        _id: '5a422aa71b54a6',
        title: 'Not titled',
        likes:2,
        author:"Evan1"
      },
      {
        _id: '5a422aa71b54a6',
        title: 'Not titled',
        likes:2,
        author:"Evan1"
      },
      {
        _id: '5a422aa71b54a6',
        title: 'Not titled',
        likes:2,
        author:"Evan1"
      },
      {
        _id: '5a422aa71b54a6',
        title: 'Not titled',
        likes:2,
        author:"Evan1"
      },
      {
        _id: '5a422aa71b54a6',
        title: 'Not titled',
        likes:2,
        author:"Evan4"
      },
      {
        _id: '5a422aa71b54a6',
        title: 'Not titled',
        likes:2,
        author:"Evan3"
      },
      {
        _id: '5a422aa71b54a6',
        title: 'Not titled',
        likes:2,
        author:"Evan2"
      },
      {
        _id: '5a422aa71b54a6',
        title: 'Not titled',
        likes:2,
        author:"Evan2"
      },
    ]
    test("when list has only one blog, equals the likes of that", () => {
      const result = listHelper.mostBlogerLikes(listWithOneBlog);
      expect(result).toEqual({author:"HSAIODH",likes:2});
    });

    test("when list has many blogs, equals the likes of that", () => {
      const result = listHelper.mostBlogerLikes(listWithManyBlog);
      expect(result).toEqual({author:"Evan1",likes:8});
    });
  });




