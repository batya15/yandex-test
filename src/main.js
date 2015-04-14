console.log('startApp');

var terminal = new window.Class.TerminalController();

terminal.addCommand('cmd', function(e, r){
    console.info(e, r);
    return 'ok';
});

terminal.runCommand('cmd()', function() {
    console.info(arguments);
});
terminal.runCommand('cmd(1)', function() {
    console.info(arguments);
});
terminal.runCommand('cd(asdf)', function() {
    console.info(arguments);
});
terminal.runCommand('cmd(1)', function() {
    console.info(arguments);
});
terminal.runCommand('cmdasdf, natya)', function() {
    console.info(arguments);
});
