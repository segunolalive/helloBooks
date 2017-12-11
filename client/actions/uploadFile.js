import request from 'superagent';


export default file => (
  () => (
    new Promise((resolve, reject) => {
      request
        .post(CLOUDINARY_API_BASE)
        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
        .field('file', file)
        .end((error, response) => (
          error ? reject(error) : resolve(response)
        ));
    }))
);
