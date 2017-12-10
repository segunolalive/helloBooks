export default () => {
  const $ = window.$ || window.jquery;
  $(document).ready(() => {
    $('.modal').modal();
  });
};
