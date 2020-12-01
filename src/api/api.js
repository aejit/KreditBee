


let config = {
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': 'Basic ' + btoa(authString)
    }
  }
  
  export const getAlbums = async () => {  
    const response =  await fetch(`https://jsonplaceholder.typicode.com/albums`,config);
    if (response.status !== 200) {
      throw new Error('received a non ok status');
    }
    return  await response.json();
  }

  export const getAlbumsById = async (id) => {
    id = encodeURIComponent(id);
    const response =  await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${id}`,config);
    if (response.status !== 200) {
      throw new Error('received a non ok status');
    }
    return await response.json();
  }

