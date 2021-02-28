const path = {
  page: {
    home: '/',
    posts: '/posts',
    createPost: '/posts/new',
    post: (id: number) => `/posts/${id}`,
  },

  api: {
    comments: 'https://simple-blog-api.crew.red/comments',
    posts: 'https://simple-blog-api.crew.red/posts',
    post: (id: number, comments: boolean = false) =>
      `https://simple-blog-api.crew.red/posts/${id}${comments ? '?_embed=comments' : ''}`,
  },
}

export default path
