import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await axios.get('https://imdb8.p.rapidapi.com/actors/get-all-images', {
          // required headers
          headers: {
            'x-rapidapi-key': process.env.REACT_APP_API_KEY,
            'x-rapidapi-host': process.env.REACT_APP_API_HOST,
            'useQueryString': true
          },
          // required params, nconst === actor ID
          // API_url?nconst=nm0001667
          // ex: https://imdb8.p.rapidapi.com/actors/get-all-images?nconst=nm0001667
          params: {
            nconst: 'nm0001667' // 'Jonathan Rhys Meyes', this actor's ID
          }
        });

        const data = response.data; // json data
        const arrayOfImages = data.resource.images;
        // console.log(data.resource.images); // an array of image urls, metadata, etc.
        // console.log(data.resource.images[0].url); // first image url
        // console.log(arrayOfImages);
  
        if (arrayOfImages.length > 0) {
          let result = [];

          for (let i = 0; i < 3; i++) {
            // console.log(arrayOfImages[i].url);
            // setImages([...images, arrayOfImages[i].url]);
            result.push(arrayOfImages[i].url);
          }
          setImages(result);
        }

      } catch (err) {
        console.error(err.message);
      }
    };
    
    fetchApi();
  }, []);

  const showImages = images.map(( imgUrl, idx ) => (
    <div key={ idx } className="image">
      {
        <img src={ imgUrl } alt="actor"></img>
      }
    </div>
  ));

  return (
    <div className="App">
      { showImages }
    </div>
  );
}

export default App;
