"use strict";

(function () {

    var BrowserView = function (terminalController) {
        var self = this;
        this.currentTab = localStorage['currentTab'];

        this.terminalController = terminalController;
        this.tabs = [];
        this.$el = $('[data-browser]');
        this.$el.find('[data-tabs]').on('click', 'li', this.onClickSelectTab.bind(this));

        this.terminalController.addCommand('selectTab', this.commandSelectTab.bind(this));
        this.terminalController.addCommand('swapTabs', this.commandSwapTabs.bind(this));
        this.terminalController.addCommand('showStat', this.commandShowStat.bind(this));

        this.$el.find('[data-caption]').each(function (i, el) {
            var text = el.getAttribute("data-caption");
            var li = document.createElement('li');
            li.innerHTML = text;
            li.setAttribute('data-id', i);
            var $elLi = $(li).appendTo(self.$el.find('[data-tabs]'));
            self.tabs.push({
                li: $elLi,
                el: $(el).hide(),
                caption: text,
                time: 0
            });
        });
        if (typeof this.currentTab === 'undefined' || this.currentTab < 0 || this.currentTab > this.tabs.length - 1) {
            this.currentTab = 0;
        }
        this.selectTab(this.currentTab);

    };

    /**Выбор таба по ID
     * @param id
     */
    BrowserView.prototype.selectTab = function (id) {
        localStorage['currentTab'] = id;
        if (this.currentTab !== id) {
            this.tabs[this.currentTab].el.hide();
            this.tabs[this.currentTab].li.removeClass('active');
            this.tabs[this.currentTab].time = this.tabs[this.currentTab].time + (Date.now() - this.tabs[this.currentTab].start);
        }

        this.tabs[id].el.show();
        this.tabs[id].li.addClass('active');
        this.tabs[id].start = Date.now();

        this.currentTab = id;
    };

    /**
     * Выбор таба по клику
     * @param e
     */
    BrowserView.prototype.onClickSelectTab = function (e) {
        this.selectTab($(e.currentTarget).data('id'));
    };
    /**
     * Выбор таба по команде
     * @param id
     * @returns {*}
     */
    BrowserView.prototype.commandSelectTab = function (id) {
        var li,
            idElement,
            result,
            i = parseInt(id);

        if (isNaN(i) || i > this.tabs.length - 1 || i < 0) {
            result = 'Не удалось выбрать таб №' + id + '. Доступны табы с 0 по ' + (this.tabs.length - 1) + '.';
        } else {
            li = this.$el.find('[data-tabs] > [data-id]').eq(i);
            idElement = li.data('id');
            this.selectTab(idElement);
            result = 'Выбран таб №' + id + ' "' + this.tabs[idElement].caption + '"';
        }

        return result;

    };

    /**
     * Смена табов местами
     * @param l
     * @param r
     * @returns {*}
     */
    BrowserView.prototype.commandSwapTabs = function (l, r) {
        var left = parseInt(l),
            right = parseInt(r),
            leftEl, rightEl,
            result;
        if (isNaN(left) || isNaN(right) || left < 0 || right < 0 || left > this.tabs.length - 1 || right > this.tabs.length - 1) {
            result = 'Ошибка! Доступны табы с 0 по ' + (this.tabs.length - 1) + '.';
        } else {
            leftEl = this.$el.find('[data-tabs] > [data-id]').eq(left);
            rightEl = this.$el.find('[data-tabs] > [data-id]').eq(right);
            var helper = $('<div/>').insertBefore(leftEl);
            leftEl.insertBefore(rightEl);
            rightEl.insertBefore(helper);
            helper.remove();
            result = 'Поменяли табы №' + l + ' "список иконок" и №' + r + ' "контрол рейтинга" местами.';
        }

        return result;
    };

    /** Статистика
     */
    BrowserView.prototype.commandShowStat = function () {
        var result = '',
            self = this,
            rusSecond= ['секунда', 'секунды', 'секунд'],
            cases = [2, 0, 1, 1, 1, 2];

        this.tabs.forEach(function (val, i) {
            var sec, text;
            if (i == self.currentTab) {
                val.time = val.time + (Date.now() - val.start);
                val.start = Date.now();
            }
            sec = Math.round(val.time / 1000);
            text = rusSecond[(sec % 100 > 4 && sec % 100 < 20)? 2: cases[(sec % 10 < 5) ? sec % 10 : 5]];
            result += i + ' "' + val.caption + '" : ' + sec + ' ' + text + ' <br/>';
        });
        return result;
    };

    window.Class.BrowserView = BrowserView;
}());
