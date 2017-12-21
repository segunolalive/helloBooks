import request from 'superagent';


export default file => (
  () => (
    request
      .post(CLOUDINARY_API_BASE)
      .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
      .field('file', file)
  )
);
