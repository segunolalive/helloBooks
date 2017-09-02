export default () => {
  const $ = window.$ || window.jquery;

  $(document).ready(() => {
    $('.button-collapse').sideNav({ edge: 'right' });
  });
};
