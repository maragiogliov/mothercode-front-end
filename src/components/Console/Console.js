var MirrorConsole = require('mirror-console');
var content = document.querySelector('.content');
var editor = new MirrorConsole();
editor.setText(content.textContent);
editor.swapWithElement(content); // insert editor
var consoleMock = {
    log: function (arg) {
        function line(text) {
            var div = document.createElement('div');
            div.appendChild(document.createTextNode(text));
            return div;
        }
        document.getElementById('output').appendChild(line(arg));
    },
};
// eval code
editor.runInContext({ console: consoleMock }, function (error, result) {
    if (error) {
        console.error(error);
    }
});
editor.destroy(); // remote editor
