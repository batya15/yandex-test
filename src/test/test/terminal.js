"use strict";

QUnit.module('controllers/terminal');

var terminalController = new window.Class.TerminalController();

QUnit.test('Регистрация команды в терминале', function (assert) {
    expect(2);
    var result;

    result = terminalController.addCommand('ls', function(i) {
        return 'list'+i;
    });
    assert.ok(result, 'Команда Зарегистрирована');

    result = terminalController.addCommand('dir');
    assert.ok(!result, 'Команда Не зарегестирована');


});

QUnit.test('Ввыполнение команд команды в терминале', function (assert) {
    expect(4);

    terminalController.runCommand('ls(2)', function(err, result) {
        console.log(err, result);
        assert.ok(err === null, 'Ошибки отсутствуют');
        assert.ok(result === 'list2', 'Результат команды верный');
    });

    terminalController.runCommand('ls)', function(err) {
        assert.ok(err === 'SyntaxError: ls)', 'Синтаксическая ошибка ls)');
    });

    terminalController.runCommand('dir', function(err) {
        assert.ok(err === 'SyntaxError: dir', 'Команда dir отсутствует');
    });

});


QUnit.test('Проверка истории', function (assert) {
    expect(2);
    assert.ok(terminalController._history[0] === 'ls(2)', 'Команда 1 в истории');
    assert.ok(terminalController._history[1] === 'ls)', 'Команда 2 в истории');

});

QUnit.test('Переходы по командам', function (assert) {
    expect(2);
    assert.ok(terminalController.getCommandNext() === 'ls(2)', 'Переход к следующей команде');
    assert.ok(terminalController.getCommandPrev() === 'dir', 'Переход к предыдущей команде');

});