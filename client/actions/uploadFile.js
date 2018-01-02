import request from 'superagent';

/**
 * utility function for uploading files
 *
 * @param {Object} file  DOM file object
 *
 * @returns {Promise} resolves with file metadata
 */
export default file => (
  () => (
    request
      .post(CLOUDINARY_API_BASE)
      .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
      .field('file', file)
  )
);
