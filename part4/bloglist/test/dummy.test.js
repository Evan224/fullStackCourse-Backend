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
  })
