$(document).ready(function () {
  $(".button-collapse").sideNav({ edge: 'right' });
  $('select').material_select();

  $(function() {

    var visibleHeight = $(document).height() - $(window).height();
    var items;

    storeElements();

    $(window).on('resize', function(e) {
        updateHeight();
    });

    $(window).on('scroll', function(e) {
        loadContent();
    });

    function loadContent() {

        if($(window).scrollTop() >= visibleHeight) {

            $(window).unbind('scroll');

            var loadingWrap = $('.loading-wrap');
            let library = $('.library');

            loadingWrap.fadeIn(function() {
                setTimeout(function() {
                    library.append(items);
                    loadingWrap.hide(function() {
                        updateHeight();
                        storeElements();
                        $(window).on('scroll', function() { loadContent(); });
                    });
                }, 500);
            });

        }
    }

    function updateHeight() {
        visibleHeight = $(document).height() - $(window).height();
    }

    // convert this to Ajax function to get stuff fro database
    function storeElements() {
        items = $('.library-item:lt(5)').clone();
    }

    // $('.menus h3').on('click', function(e) {
    //     $(this).next('ul').toggleClass('open');
    //     updateHeight();
    //     e.preventDefault(); return false;
    // });

  });

});
