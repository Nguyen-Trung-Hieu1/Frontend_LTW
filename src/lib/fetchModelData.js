function fetchModel(url) {
  return new Promise(function (resolve, reject) {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          reject(new Error(response.statusText));
        } else {
          return response.json();
        }
      })
      .then((data) => resolve({ data }))
      .catch((error) => reject(error));
  });
}

export default fetchModel;