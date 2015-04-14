"use strict";

(function () {

    var TerminalController = function () {
        this._history = [];
        this.commands = {};
    };

    /**
     * ���������� ������ � ���������
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
     * ������ ������ �� ��������� ������
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
     * ���������� �������
     * @param command
     * @private
     */
    TerminalController.prototype._saveCommand = function (command) {
        if (this._history.length > 9) {
            this._history.splice(0, 1);
        }
        this._history.push(command);
        this.currentIndex = this._history.length;
    };

    /**
     * ��������� ������� �� �������
     * @returns {*}
     */
    TerminalController.prototype.getCommandNext = function () {
        var result;
        if (typeof this.currentIndex === "number") {
            this.currentIndex = (this.currentIndex + 1 > this._history.length) ? this.currentIndex = 1 : this.currentIndex + 1;
            result = this._history[this.currentIndex - 1];
        }
        return result;
    };

    /**
     * ���������� ������� �� �������
     * @returns {*}
     */
    TerminalController.prototype.getCommandPrev = function () {
        var result;
        if (typeof this.currentIndex === "number") {
            this.currentIndex = (this.currentIndex - 1 < 1) ? this.currentIndex = this._history.length : this.currentIndex - 1;
            result = this._history[this.currentIndex - 1];
        }
        return result;
    };

    window.Class.TerminalController = TerminalController;
}());



