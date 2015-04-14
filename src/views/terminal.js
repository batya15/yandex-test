"use strict";

(function () {

    var TerminalView = function (terminalController) {
        this.terminalController = terminalController;
        this.$el = $('[data-terminal]');
        this.$el.find('[data-run]').on('click', this.runCommand.bind(this));
        this.$el.find('[data-input]').on('keyup', this.onPressUp.bind(this));
        this.$el.find('[data-input]').on('keydown', this.onKeyDown.bind(this));
        this.terminalController.addCommand('clean', this.clean.bind(this));
    };


    /**
     * ������ �������
     */
    TerminalView.prototype._addText = function (text, type) {
        var div = document.createElement('div');
        div.className = type;
        div.innerHTML = text;
        this.$el.find('[data-output]').append(div);
        this.$el.find('[data-output]').get(0).scrollTop =  this.$el.find('[data-output]').get(0).scrollHeight;
    };

    /**
     * ������ �������
     */
    TerminalView.prototype.runCommand = function () {
        var command = this.$el.find('[data-input]').val();
        var self = this;
        this.$el.find('[data-input]').val('');
        this._addText('> ' + command, 'log');
        if (command.length) {
            this.terminalController.runCommand(command, function (err, result) {
                if (err) {
                    self._addText(err, 'err');
                } else {
                    self._addText((result)? result : '', 'log');
                }
            });
        }
    };

    /**
     * ��������� Enter, up, down
     * @param e
     */
    TerminalView.prototype.onPressUp = function (e) {
        if (e.keyCode === 13) {
            this.runCommand();
        } else if (e.keyCode === 40) {
            this.$el.find('[data-input]').val(this.terminalController.getCommandNext());
        } else if (e.keyCode === 38) {
            this.$el.find('[data-input]').val(this.terminalController.getCommandPrev());
        }
    };

    /**
     * ������� �������
     * @param e
     */
    TerminalView.prototype.clean = function () {
        this.$el.find('[data-output]').empty();
    };

    /**
     * ����� ������ �� ������
     * @param e
     */
    TerminalView.prototype.onKeyDown = function (e) {
        if (e.keyCode === 40 || e.keyCode === 38) {
            e.preventDefault();
            e.stopPropagation();
        }
    };

    window.Class.TerminalView = TerminalView;
}());
