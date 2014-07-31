define(
    ['jquery'],
    function ($) {

        var DeadSimpleCarousel = function (container, opts) {

            this.container = $(container);

            this.window = this.container.find('.dsc__window');
            this.panel = this.container.find('.dsc__panel');
            this.items = this.container.find('.dsc__item');

            var classes = opts.classes;

            this.prevButton = this.container.find('.' + classes.prevButton);
            this.nextButton = this.container.find('.' + classes.nextButton);

            $(window).on('resize', function () {


                

            });

            var panelWidth = 0, maxHeight = 0;
            this.items.each(function (index) {
                var item = $(this);
                var height = parseInt(item.height(), 10);
                maxHeight = Math.max(height, maxHeight);
                panelWidth += parseInt(item.width(), 10);
            });

            this.container.css('height', maxHeight + 'px');
            
            var paddingLeft = this.prevButton.width();
            var paddingRight = this.nextButton.width();
            this.panel.css({
                width: panelWidth + 'px',
                paddingLeft: paddingLeft,
                paddingRight: paddingRight
            })
        };

        DeadSimpleCarousel.prototype = {
            container: null,
        }

        return DeadSimpleCarousel;
    }
);