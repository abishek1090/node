const fetchComments=(id)=>{
    return  new Promise((resolve,reject)=>{
        return fetch("http://localhost:8080/api/comments/"+id).then(response => response.json())
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });

    })
}

exports.fetchComments=fetchComments;