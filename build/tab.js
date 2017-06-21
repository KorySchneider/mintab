window.onload = function () {
    loadSettings();
    applySettings();
    $('body').click(function () { $('#input').focus(); });
};
function loadSettings() {
    if (typeof (Storage)) {
        // Create settings object if it doesn't exist
        if (localStorage.getItem('settings') == null) {
            var defaultSettings = {
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
    // Color settings
    'bgColor': function (args) {
        //TODO
    },
    'textColor': function (args) {
        //TODO
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
    var keys = Object.keys(COMMANDS);
    for (var i = 0; i < keys.length; i++) {
        if (command == keys[i]) {
            COMMANDS[command](args);
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
