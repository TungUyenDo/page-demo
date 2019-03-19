(function ($) {
    "user strict";

    /* ================================
    ===  Projects Isotope(Style)   ====
    =================================== */

    var $win = $(window),
        $projects = $('#isotope'),
        loadMoreLink = $(".load-more"),
        projectFilterUl = $('.project-filter ul');

    var layoutType = 'masonry';

    $win.on('load resize', function (event) {
        winW = $win.width();
        winH = $win.height();

        if (event.type === 'load') {
            $projects.isotope({
                itemSelector: '.col-md-3',
                layoutMode: layoutType
            }).addClass('projects-loaded');
        } else {
            setTimeout(function () {
                $projects.isotope('layout');
            }, 700);
        }

        //ISOTOPE LOAD MORE FUNCTION
        var initShow = 8; //number of items loaded on init & onclick load more button
        var counter = 4; //counter for load more button
        var iso = $projects.data('isotope'); // get Isotope instance
        loadMore(initShow); //execute function onload

        function loadMore(toShow) {
            $projects.find(".hidden").removeClass("hidden");

            var hiddenElems = iso.filteredItems.slice(toShow, iso.filteredItems.length).map(function (item) {
                return item.element;
            });
            $(hiddenElems).addClass('hidden');
            $projects.isotope('layout');

            //when no more to load, hide show more button
            if (hiddenElems.length == 0) {
                jQuery(".load-more").hide();
            } else {
                jQuery(".load-more").show();
            };
        }

        //when load more button clicked
        loadMoreLink.on('click', function () {
            if (projectFilterUl.data('clicked')) {
                //when filter button clicked, set initial value for counter
                counter = initShow;
                projectFilterUl.data('clicked', false);
            } else {
                counter = counter;
            };
            counter = counter + initShow;
            loadMore(counter);
        });

        //when filter button clicked
        projectFilterUl.on('click', function () {
            $(this).data('clicked', true);
            loadMore(initShow);
        });
    });

    // filter items on button click
    projectFilterUl.on('click', 'button', function () {
        var filterValue = $(this).attr('data-filter');
        $projects.isotope({ filter: filterValue });
    });


})(jQuery);