export default (url, options) => {
  if (!options) {
    return url;
  }
  const base = CLOUDINARY_IMG_URL_STUB;
  let tail = url.split(base)[1];
  if (options.width) {
    tail = `w_${options.width}/${tail}`;
  }
  if (options.height) {
    tail = `h_${options.height}/${tail}`;
  }
  return `${base}${tail}`;
};
