console.log('startApp');

var terminal = new window.Class.TerminalController();

terminal.addCommand('print', function(text){
    return text;
});

new window.Class.TerminalView(terminal);
