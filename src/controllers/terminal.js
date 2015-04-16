"use strict";

(function () {

    var TerminalController = function () {
        this._history = [];
        this.commands = {
            help: this.listCommand
        };
    };

    /**
     * Регистация команд в терминале
     * @param name
     * @param fn
     * @returns {boolean}
     */
    TerminalController.prototype.addCommand = function (name, fn) {
        if (typeof fn === 'function') {
            this.commands[name] = fn;
            return true;
        } else {
            console.error('fn not is function');
            return false;
        }
    };

    /**
     * Список комнад
     */
    TerminalController.prototype.listCommand = function () {
        var result = '';
        for (var cmd in this.commands) {
            if (!this.commands.hasOwnProperty(cmd)) {
                continue;
            }
            result += cmd + '<br/>';
        }
        return result;
    };

    /**
     * Запуск команд из командной строки
     * @param command
     * @param cb
     */
    TerminalController.prototype.runCommand = function (command, cb) {
        var regEx = /(^\w+)\((.*)\)$/i,
            match = regEx.exec(command.replace(/\s+/g, ''));

        if (typeof cb === 'function') {
            if (match) {
                if (this.commands.hasOwnProperty(match[1])) {
                    cb(null, this.commands[match[1]].apply(this, match[2].split(',')));
                } else {
                    cb('Command not found: ' + command);
                }
            } else {
                cb('SyntaxError: ' + command);
            }
        } else {
            console.error('callback not is function');
        }

        if (this._history[this._history.length - 1] != command) {
            this._saveCommand(command);
        }

    };

    /**
     * Сохранение истории
     * @param command
     * @private
     */
    TerminalController.prototype._saveCommand = function (command) {
        if (this._history.length > 9) {
            this._history.splice(0, 1);
        }
        this._history.push(command);
        delete this.currentIndex;
    };

    /**
     * Следующая команда из истории
     * @returns {*}
     */
    TerminalController.prototype.getCommandNext = function () {
        var result;
        if (typeof this.currentIndex === "number") {
            this.currentIndex = (this.currentIndex + 1 > this._history.length) ? this.currentIndex = 1 : this.currentIndex + 1;
            result = this._history[this.currentIndex - 1];
        } else {
            result = this._history[0];
            this.currentIndex = 1;
        }
        return result;
    };

    /**
     * Предыдущая команда из истории
     * @returns {*}
     */
    TerminalController.prototype.getCommandPrev = function () {
        var result;
        if (typeof this.currentIndex === "number") {
            this.currentIndex = (this.currentIndex - 1 < 1) ? this.currentIndex = this._history.length : this.currentIndex - 1;
            result = this._history[this.currentIndex - 1];
        } else {
            result = this._history[this._history.length - 1];
            this.currentIndex = this._history.length;
        }
        return result;
    };

    window.Class.TerminalController = TerminalController;
}());



