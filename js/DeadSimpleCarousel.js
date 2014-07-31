define(
    ['jquery'],
    function ($) {

        var DeadSimpleCarousel = function (container, opts) {

            this.container = $(container);

            this.window = this.container.find('.dsc__window');
            this.panel = this.container.find('.dsc__panel');
            this.items = this.container.find('.dsc__item');
            this.controls = this.container.find('.dsc__controls');

            var classes = opts.classes;

            this.prevButton = this.container.find('.' + classes.prevButton);
            this.nextButton = this.container.find('.' + classes.nextButton);

            this.transitionDuration = 200; // ms

            this.itemCount = 0;
            this.itemWidth = 0;

            this.addListeners();
            this.update();
        };

        DeadSimpleCarousel.prototype = {

            addListeners: function () {

                var self = this,
                    resizeTimer,
                    scrollTimer;

                $(window).on('resize', function () {
                    clearTimeout(resizeTimer);
                    resizeTimer = setTimeout(function () {
                        self.updateControls();
                    }, 100);
                });

                this.window.on('scroll', function (e) {
                    clearTimeout(scrollTimer);
                    scrollTimer = setTimeout(function () {
                        self.updateControls();
                    }, 100);
                });

                this.nextButton.on('click', function (e) {
                    e.preventDefault();
                    self.moveNext();
                });

                this.prevButton.on('click', function (e) {
                    e.preventDefault();
                    self.movePrevious();
                });
            },

            itemsInWindow: function () {
                return Math.floor(
                    (this.window.width() - this.prevButton.width() - this.nextButton.width()) / this.itemWidth
                );
            },
            moveTo: function (left) {
                var self = this;
                this.window.animate(
                    { scrollLeft: left },
                    self.transitionDuration,
                    function () {
                        self.updateControls();
                    }
                );
            },

            moveNext: function () {
                console.log(this.itemsInWindow());
                var currentLeft = this.window.scrollLeft();
                var left = currentLeft + (this.itemWidth * this.itemsInWindow());
                this.moveTo(left);
            },
            movePrevious: function () {
                var currentLeft = this.window.scrollLeft();
                var panelWidth = this.panel.width();
                var left = currentLeft - (this.itemWidth * this.itemsInWindow());
                this.moveTo(left);
            },
            updateControls: function () {

                var showControls = this.window.width() < this.panel.width();

                if (showControls) {

                    this.controls.show();

                    var left = this.window.scrollLeft();

                    if (left <= 0) this.disableButton(this.prevButton);
                    else this.enableButton(this.prevButton);

                    if (left + (this.window.width() - this.prevButton.width() - this.nextButton.width())
                        >= this.panel.width())
                        this.disableButton(this.nextButton);
                    else
                        this.enableButton(this.nextButton);

                    var paddingLeft = this.prevButton.width();
                    var paddingRight = this.nextButton.width();
                    this.panel.css({
                        paddingLeft: paddingLeft,
                        paddingRight: paddingRight
                    });

                } else {
                    
                    this.panel.css({
                        paddingLeft: 0,
                        paddingRight: 0
                    });

                    this.controls.hide();
                }
            },
            enableButton: function (button) {
                button.removeAttr('disabled');
            },
            disableButton: function (button) {
                button.attr('disabled', 'disabled');
            },
            update: function () {
                var panelWidth = 0, containerHeight = 0;

                this.itemCount = this.items.length;

                if (this.itemCount) {
                    var firstItem = this.items.first();
                    this.itemWidth = firstItem.width();
                    containerHeight = firstItem.height();
                    panelWidth = this.itemWidth * this.itemCount;
                }

                this.container.css('height', containerHeight + 'px');
                
                this.panel.css({
                    width: panelWidth + 'px'
                });

                this.updateControls();
            }
        }

        return DeadSimpleCarousel;
    }
);