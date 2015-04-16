console.log('startApp');

var terminal = new window.Class.TerminalController();

terminal.addCommand('print', function(text){
    return text;
});

new window.Class.TerminalView(terminal);
new window.Class.BrowserView(terminal);
new window.Class.ManView(terminal);
