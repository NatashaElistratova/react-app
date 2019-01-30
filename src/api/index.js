 export function getPosts(params) {
   return fetch (`https://jsonplaceholder.typicode.com/posts?
    ${params.limit ? `&_limit=${params.limit}`: ''}
    ${params.page ? `&_page=${params.page}`: ''}
    &_sort=id
    ${params.order ? `&_order=${params.order}`: ''}
    ${params.searchVal ? `&q=${params.searchVal}`: ''}`
    .replace(/\s/g, ''))
    .then(response =>
      response.json()
        .then(data => ({
          posts: data,
          totalCount: response.headers.get('x-total-count')
        })
      ).then(data => data));
}

 export function getAlbums(params) {
   return fetch (`https://jsonplaceholder.typicode.com/albums?
    ${params.limit ? `&_limit=${params.limit}`: ''}
    ${params.page ? `&_page=${params.page}`: ''}
    &_sort=id
    ${params.order ? `&_order=${params.order}`: ''}
    ${params.searchVal ? `&q=${params.searchVal}`: ''}`
     .replace(/\s/g, ''))
     .then(response =>
       response.json()
         .then(data => ({
             albums: data,
             totalCount: response.headers.get('x-total-count')
           })
         ).then(data => data));
 }

 export function getPhotos(params) {
   return fetch (`https://jsonplaceholder.typicode.com/photos?
    ${params.limit ? `&_limit=${params.limit}`: ''}
    ${params.page ? `&_page=${params.page}`: ''}
    &_sort=id
    ${params.order ? `&_order=${params.order}`: ''}
    ${params.searchVal ? `&q=${params.searchVal}`: ''}`
     .replace(/\s/g, ''))
     .then(response =>
       response.json()
         .then(data => ({
             photos: data,
             totalCount: response.headers.get('x-total-count')
           })
         ).then(data => data));
 }

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
