import axios from "axios";

export const getBackgrounds = async (destinations) => {

  const promises = destinations.map(destination =>
    getImage(destination.photoId, destination.id)
  );

  return Promise.all(promises)
    .then(images => {
      return destinations.map(destination => {
        const associatedBackground = images.find(
          image => image.id === destination.id
        );
        return {
            ...destination,
          background: associatedBackground.image
        };
      });
    })
    .catch(err => {
      console.error("when fetching background images", err);
    });
};

export const getImage = (photoId, id) => {
  const FLICKR_API_KEY="294f34ea89e701cd06bf7f63d4b7e8c5";
  const flickrUrl = `https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=${FLICKR_API_KEY}&photo_id=${photoId}&format=json&nojsoncallback=1`;

  return axios
    .get(flickrUrl)
    .then(data => {
      return data.data.sizes.size;
    })
    .then(allSizes => allSizes.filter(size => size.label === "VR 4k"))
    .then(image => {
      return {
        id,
        image: image[0].source
      };
    });
};
