"use strict";

(function () {

    var ManView = function (terminalController) {
        this.$el = $('[data-man]');
        terminalController.addCommand('nichose', this.nichose.bind(this));
    };

    ManView.prototype.nichose = function () {
        var self = this;
        if (this.$el.hasClass('hide')) {
            this.$el.removeClass('hide');
            this.$el.find('audio').get(0).play();
            setTimeout(function () {
                self.$el.addClass('hide');
            }, 700);
        }
    };


    window.Class.ManView = ManView;
}());
