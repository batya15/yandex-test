"use strict";

(function () {

    var BrowserView = function (terminalController) {
        var self = this;
        this.terminalController = terminalController;
        this.$el = $('[data-browser]');
        this.$el.find('[data-tabs]').on('click', 'li', this.onClickSelectTab.bind(this));

        this.terminalController.addCommand('selectTab', this.commandSelectTab.bind(this));
        this.terminalController.addCommand('swapTabs', this.commandSwapTabs.bind(this));
        this.terminalController.addCommand('showStat', this.commandShowStat.bind(this));

        this.active = 2;

        this.$el.find('[data-content] > [data-tab]').each(function (i, el) {
            var text = el.getAttribute("data-tab");
            var li = document.createElement('li');
            li.innerHTML = text;
            li.setAttribute('data-id', text);
            self.$el.find('[data-tabs]').append(li);
        });
    };

    BrowserView.prototype.selectTab = function (id) {
        this.$el.find('[data-content] > [data-tab]').hide();
        this.$el.find('[data-tab = "' + id + '"]').show();
        this.$el.find('[data-tabs] > [data-id]').removeClass('active');
        this.$el.find('[data-id = "' + id + '"]').addClass('active');
    };

    BrowserView.prototype.onClickSelectTab = function (e) {
        this.selectTab($(e.currentTarget).data('id'));
    };

    BrowserView.prototype.commandSelectTab = function (id) {
        var li = this.$el.find('[data-tabs] > [data-id]').eq(id-1),
            idElement,
            result;

        if (li.length) {
            idElement = li.data('id');
            this.selectTab(idElement);
            result = 'Выбран таб №' + id + ' "' + idElement + '"';
        } else {
            result = 'Не удалось выбрать таб №' + id + '. Доступны табы с 0 по 3.';
        }

        return result;

    };

    BrowserView.prototype.commandSwapTabs = function (text, type) {
    };

    BrowserView.prototype.commandShowStat = function (text, type) {
    };

    window.Class.BrowserView = BrowserView;
}());
