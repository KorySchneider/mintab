var SETTINGS;
window.onload = function () {
    loadSettings();
    applySettings();
    $('body').click(function () { $('#input').focus(); });
};
var COMMANDS = {
    // Google
    'g': function (args) { simpleSearch('google.com', '/search?q=', encodeArgs(args)); },
    //Reddit
    'r': function (args) { simpleSearch('reddit.com', '/r/', args); },
    // DuckDuckGo
    'dg': function (args) { simpleSearch('duckduckgo.com', '/search?q=', encodeArgs(args)); },
    // YouTube
    'y': function (args) { simpleSearch('youtube.com', '/results?search_query=', encodeArgs(args)); },
    // Amazon
    'a': function (args) { simpleSearch('smile.amazon.com', '/s/?field-keywords=', encodeArgs(args)); },
    // Wikipedia
    'w': function (args) { simpleSearch('wikipedia.org', '/w/index.php?title=Special:Search&search=', encodeArgs(args, 1)); },
    // Wolfram Alpha
    'wa': function (args) { simpleSearch('wolframalpha.com', '/input/?i=', encodeArgs(args)); },
    // Netflix
    'n': function (args) { simpleSearch('netflix.com', '/search?q=', encodeArgs(args)); },
    // Internet Movie Database
    'imdb': function (args) { simpleSearch('imdb.com', '/find?s=all&q=', encodeArgs(args)); },
    // Google Maps
    'gm': function (args) { simpleSearch('maps.google.com', '/maps?q=', encodeArgs(args)); },
    // Google Drive
    'gd': function (args) { simpleSearch('drive.google.com', '/drive/search?q=', encodeArgs(args)); },
    // Google Images
    'img': function (args) { simpleSearch('google.com', '/search?tbm=isch&q=', encodeArgs(args)); },
    // Inbox
    'i': function (args) { simpleSearch('inbox.google.com', '/search/', encodeArgs(args)); },
    // Keep
    'k': function (args) { simpleSearch('keep.google.com', '/#search/text=', encodeArgs(args)); },
    // Dictionary
    'dict': function (args) { simpleSearch('dictionary.com', '/browse/', encodeArgs(args)); },
    // Thesaurus
    'thes': function (args) { simpleSearch('thesaurus.com', '/browse/', encodeArgs(args)); },
    // Settings
    'set': function (args) {
        // TODO
        // syntax:
        // set <setting> <value>
    }
};
function simpleSearch(url, search, args) {
    var destination = url;
    if (args.length > 0 && args[0] !== '') {
        destination += search + args[0];
    }
    redirect(destination);
}
function interpret() {
    var input = $('#input').val();
    // Input is empty
    if (input == '') {
        return;
    }
    // Input is a URL
    if (/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(input)) {
        if (!input.includes(' ')) {
            redirect(input);
            return;
        }
    }
    // Parse & format input
    var args = input.split(';');
    var command = args[0].trim();
    for (var i = 0; i < args.length; i++) {
        args[i] = args[i].trim();
    }
    // Execute
    var validCommand = false;
    var keys = Object.keys(COMMANDS);
    for (var i = 0; i < keys.length; i++) {
        if (command == keys[i]) {
            validCommand = true;
        }
    }
    if (validCommand) {
        args = args.slice(1, args.length);
        COMMANDS[command](args);
    }
    else {
        COMMANDS[SETTINGS['defaultCommand']](args);
    }
}
function redirect(url) {
    url = (/(http(s)?:\/\/.)/.test(url))
        ? url
        : 'http://' + url;
    window.location.href = url;
    return false;
}
function encodeArgs(args, alt) {
    if (alt === void 0) { alt = 0; }
    if (alt) {
        for (var i = 0; i < args.length; i++) {
            args[i] = args[i].replace(/ /g, '+'); // replace spaces with plus signs
        }
    }
    else {
        for (var i = 0; i < args.length; i++) {
            args[i] = encodeURIComponent(args[i]); // uri encode
        }
    }
    return args;
}
function loadSettings() {
    if (typeof (Storage)) {
        // Create settings object if it doesn't exist
        if (localStorage.getItem('settings') == null) {
            var defaultSettings = {
                'defaultCommand': 'g',
                'bgColor': '#282828',
                'textColor': '#ebdbb2'
            };
            localStorage.setItem('settings', JSON.stringify(defaultSettings));
        }
        SETTINGS = JSON.parse(localStorage.getItem('settings'));
    }
}
function applySettings() {
    $('body').css('background-color', SETTINGS['bgColor']);
    $('body').css('color', SETTINGS['textColor']);
}
function saveSettings() {
    localStorage.setItem('settings', JSON.stringify(SETTINGS));
}
function handleKeyDown(e) {
    var keycode = e.which || e.keyCode;
    if (keycode == 13) {
        interpret();
    }
}
