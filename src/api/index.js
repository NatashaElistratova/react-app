const API = 'https://jsonplaceholder.typicode.com';

export function getData(path, options) {
  let url = `${API + path}`;
  let params = "";

  if(options && options.hasOwnProperty('params')){
    for (let key in options.params) {
      if(options.params[key] && options.params[key] !== "all") {
        if (params !== "") {
          params += "&";
        }
        params += key + "=" + options.params[key];
      }

    }
    url += `${params ? '?' + params : ''}`;
  }

  return fetch(url)
    .then(response => {
      return response.json().then(json =>{
        return {
          json: json,
          headers: {
            total: response.headers.get('x-total-count') ? +response.headers.get('x-total-count') : json.length
          }
        }
      })
    } )
    .then(json => json);
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
