 export function getData(params) {
   return fetch (`https://jsonplaceholder.typicode.com/${params.path}?
    ${params.limit ? `&_limit=${params.limit}`: ''}
    ${params.page ? `&_page=${params.page}`: ''}
    ${params.start ? `&_start=${params.start}`: ''}
    ${params.end ? `&_end=${params.end}`: ''}
    ${params.albumId && params.albumId !== 'all' ? `&albumId=${params.albumId}`: ''}
    &_sort=id
    ${params.order ? `&_order=${params.order}`: ''}
    ${params.searchVal ? `&q=${params.searchVal}`: ''}`
    .replace(/\s/g, ''))
    .then(response =>
      response.json()
        .then(data => ({
          json: data,
          totalCount: response.headers.get('x-total-count')
        })
      )
        .then(data => data))
};

export function getPost(id) {
   return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
     .then(response => response.json())
     .then(json => json)
}

export function getComments(postId) {
   return fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
     .then(response => response.json())
     .then(json => json)
}
