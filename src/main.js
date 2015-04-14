console.log('startApp');

var terminal = new window.Class.TerminalController();

terminal.addCommand('cmd', function(e, r){
    console.info(e, r);
    return 'ok';
});


new window.Class.TerminalView(terminal);
