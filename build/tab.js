window.onload = function () {
};
//
// Settings
//
try {
    var SETTINGS = JSON.parse(localStorage.getItem('settings'));
}
catch (e) {
    loadSettings(); // will create defaults if first time on page
}
function loadSettings() {
    //TODO
}
function saveSettings() {
    //TODO
}
//
// Commands
//
function default_cmd(url, search, query) {
    if (search === void 0) { search = ''; }
    if (query === void 0) { query = ''; }
    // Components should be URL encoded (or not)
    // in their respective command functions
    if (query !== '') {
        redirect(url + search + query);
    }
    else {
        redirect(url);
    }
}
var google = function (args) {
    if (args.length > 0) {
        default_cmd('google.com', '/search?q=', args[0]);
    }
    else {
        default_cmd('google.com');
    }
};
var reddit = function (args) {
    //TODO
};
//
// Shortcuts
//
var shortcuts = {
    'g': google,
    'r': reddit
};
function interpret() {
    var inputBox = $('#input');
    var input = inputBox.val();
    inputBox.select();
    // Input is empty
    if (input == '') {
        return;
    }
    // Input is a URL
    if (/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(input)) {
        if (!(input.includes(' '))) {
            redirect(input);
            return false;
        }
    }
    // Parse & format input
    var args = input.split(';');
    var command = args[0].trim();
    args = args.slice(1, args.length);
    for (var i = 0; i < args.length; i++) {
        args[i] = args[i].trim();
    }
    // Execute
    var keys = Object.keys(shortcuts);
    for (var i = 0; i < keys.length; i++) {
        if (command == keys[i]) {
            shortcuts[command](args);
        }
    }
}
function redirect(url) {
    url = (/(http(s)?:\/\/.)/.test(url))
        ? url
        : 'http://' + url;
    window.location.href = url;
    return false;
}
function handleKeyDown(e) {
    var keycode;
    if (window.event) {
        keycode = window.event.keyCode;
    }
    else if (e) {
        keycode = e.which;
    }
    if (keycode == 13) {
        interpret();
    }
}
