var SETTINGS;
window.onload = function () {
    loadSettings();
    applySettings();
    $('body').click(function () { $('#input').focus(); });
};
var COMMANDS = {
    // Google
    'g': function (args) { redirect('google.com', '/search?q=', undefined, encodeArgs(args)); },
    //Reddit
    'r': function (args) {
        var url = 'reddit.com';
        var search = '/r/';
        var query = (args.length > 0) ? args[0] : '';
        var validSort = function (arg) { return (['hot', 'new', 'rising', 'controversial', 'top', 'gilded', 'wiki', 'promoted'].includes(arg)); };
        var validRange = function (arg) { return (['day', 'week', 'month', 'year', 'all'].includes(arg)); };
        switch (args.length) {
            case 0:
                redirect(url);
                break;
            case 1:
                redirect(url, search, undefined, args);
                break;
            case 2:
                query += (validSort(args[1]))
                    ? '/' + args[1]
                    : '';
                break;
            case 3:
                if (['top', 'controversial'].includes(args[1])) {
                    query += (validRange(args[2]))
                        ? '/' + args[1] + '?t=' + args[2]
                        : '';
                }
                else {
                    query += (validSort(args[1]))
                        ? '/' + args[1]
                        : '';
                }
                break;
        }
        redirect(url, search, query, undefined);
    },
    // DuckDuckGo
    'dg': function (args) { redirect('duckduckgo.com', '/?q=', undefined, encodeArgs(args)); },
    // YouTube
    'y': function (args) { redirect('youtube.com', '/results?search_query=', undefined, encodeArgs(args)); },
    // Amazon
    'a': function (args) { redirect('smile.amazon.com', '/s/?field-keywords=', undefined, encodeArgs(args)); },
    // Wikipedia
    'w': function (args) { redirect('wikipedia.org', '/w/index.php?title=Special:Search&search=', undefined, encodeArgs(args, 1)); },
    // GitHub
    'gh': function (args) {
        var url = 'github.com';
        var search = '/';
        args = encodeArgs(args);
        var query = (args.length > 0) ? args[0] : '';
        switch (args.length) {
            case 0:
                redirect(url);
                break;
            case 2:
                query += '/' + args[1];
                break;
        }
        redirect(url, search, query, undefined);
    },
    // Wolfram Alpha
    'wa': function (args) { redirect('wolframalpha.com', '/input/?i=', undefined, encodeArgs(args)); },
    // Netflix
    'n': function (args) { redirect('netflix.com', '/search?q=', undefined, encodeArgs(args)); },
    // Internet Movie Database
    'imdb': function (args) { redirect('imdb.com', '/find?s=all&q=', undefined, encodeArgs(args)); },
    // Google Maps
    'gm': function (args) { redirect('maps.google.com', '/maps?q=', undefined, encodeArgs(args)); },
    // Google Drive
    'gd': function (args) { redirect('drive.google.com', '/drive/search?q=', undefined, encodeArgs(args)); },
    // Google Calendar
    'gc': function (args) { redirect('calendar.google.com', '', '', undefined); },
    // Google Images
    'img': function (args) { redirect('google.com', '/search?tbm=isch&q=', undefined, encodeArgs(args)); },
    // Inbox
    'i': function (args) { redirect('inbox.google.com', '/search/', undefined, encodeArgs(args)); },
    // Keep
    'k': function (args) { redirect('keep.google.com', '/#search/text=', undefined, encodeArgs(args)); },
    // Dictionary
    'dict': function (args) { redirect('dictionary.com', '/browse/', undefined, encodeArgs(args)); },
    // Thesaurus
    'thes': function (args) { redirect('thesaurus.com', '/browse/', undefined, encodeArgs(args)); },
    // Help
    'help': function (args) { redirect('github.com/koryschneider/mintab#readme', true); },
    // Settings
    'set': function (args) {
        var validHex = function (v) { return /^#[0-9a-f]{3}(?:[0-9a-f]{3})?$/i.test(v); };
        if (Object.keys(SETTINGS).includes(args[0])) {
            switch (args.length) {
                case 1:
                    // No value given, print current value
                    displayMessage(args[0] + ': ' + SETTINGS[args[0]], 8000);
                    break;
                case 2:
                    // Set value
                    if (args[0] == 'defaultCommand') {
                        if (Object.keys(COMMANDS).includes(args[1])) {
                            SETTINGS['defaultCommand'] = args[1];
                        }
                        else {
                            displayMessage('Error: command "' + args[1] + '" not found; default command not changed', 5000);
                        }
                    }
                    else if (args[0] == 'bgColor') {
                        if (validHex(args[1])) {
                            SETTINGS['bgColor'] = args[1];
                        }
                        else {
                            displayMessage('Error: invalid hex value', 5000);
                        }
                    }
                    else if (args[0] == 'textColor') {
                        if (validHex(args[1])) {
                            SETTINGS['textColor'] = args[1];
                        }
                        else {
                            displayMessage('Error: invalid hex value', 5000);
                        }
                    }
                    break;
            }
        }
        else if (args[0] == 'defaults') {
            localStorage.removeItem('settings');
            loadSettings();
            displayMessage('Settings reset to defaults', 6000);
        }
        saveSettings();
        applySettings();
    }
};
function interpret() {
    var input = $('#input').val();
    $('#input').val('');
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
function redirect(url, search, query, args, newtab) {
    if (newtab === void 0) { newtab = false; }
    var destination = url;
    destination = (/(http(s)?:\/\/.)/.test(destination))
        ? destination
        : 'http://' + destination;
    if (query) {
        destination += search + query;
    }
    else if (args) {
        if (args.length > 0 && args[0] !== '') {
            destination += search + args[0];
        }
    }
    if (newtab) {
        window.open(destination).focus();
    }
    else {
        window.location.href = destination;
    }
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
function displayMessage(msg, timeMs) {
    $('#message').text(msg);
    if (timeMs > 0) {
        setTimeout(function () {
            $('#message').html('');
        }, timeMs);
    }
}
function handleKeyDown(e) {
    var keycode = e.which || e.keyCode;
    if (keycode == 13) {
        interpret();
    }
}
