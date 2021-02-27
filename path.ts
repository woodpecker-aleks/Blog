const path = {
  page: {
    home: '/',
    posts: '/posts',
    createPost: '/posts/new',
    post: (id: number) => `/posts/${id}`,
  },

  api: {
    posts: {
      all: 'https://simple-blog-api.crew.red/posts',
      id: (id: number, comments: boolean = false) =>
        `https://simple-blog-api.crew.red/posts/${id}${comments ? '?_embed=comments' : ''}`,
    },
    comments: {
      all: 'https://simple-blog-api.crew.red/comments',
    },
  },
}

export default path
