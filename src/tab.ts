window.onload = () => {
  loadSettings();
  applySettings();

//
// Settings
//
try {
  let SETTINGS = JSON.parse(localStorage.getItem('settings'));
} catch(e) {
  loadSettings(); // will create defaults if first time on page
}

function loadSettings() {
  if (typeof(Storage)) {
    // Create settings object if it doesn't exist
    if (localStorage.getItem('settings') == null) {
      let defaultSettings = {
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

const COMMANDS = {
  // Google
  'g': (args) => { simpleSearch('google.com', '/search?q=', encodeArgs(args)); },

  //Reddit
  'r': (args) => { simpleSearch('reddit.com', '/r/', args); },

  // DuckDuckGo
  'dg': (args) => { simpleSearch('duckduckgo.com', '/search?q=', encodeArgs(args)) },

  // YouTube
  'y': (args) => { simpleSearch('youtube.com', '/results?search_query=', encodeArgs(args)); },

  // Amazon
  'a': (args) => { simpleSearch('smile.amazon.com', '/s/?field-keywords=', encodeArgs(args)); },

  // Wikipedia
  'w': (args) => { simpleSearch('wikipedia.org', '/w/index.php?title=Special:Search&search=', encodeArgs(args, 1)); },

  // Wolfram Alpha
  'wa': (args) => { simpleSearch('wolframalpha.com', '/input/?i=', encodeArgs(args)); },

  // Netflix
  'n': (args) => { simpleSearch('netflix.com', '/search?q=', encodeArgs(args)); },

  // Internet Movie Database
  'imdb': (args) => { simpleSearch('imdb.com', '/find?s=all&q=', encodeArgs(args)); },

  // Google Maps
  'gm': (args) => { simpleSearch('maps.google.com', '/maps?q=', encodeArgs(args)); },

  // Google Drive
  'gd': (args) => { simpleSearch('drive.google.com', '/drive/search?q=', encodeArgs(args)); },

  // Google Images
  'img': (args) => { simpleSearch('google.com', '/search?tbm=isch&q=', encodeArgs(args)); },

  // Inbox
  'i': (args) => { simpleSearch('inbox.google.com', '/search/', encodeArgs(args)); },

  // Keep
  'k': (args) => { simpleSearch('keep.google.com', '/#search/text=', encodeArgs(args)); },

  // Dictionary
  'dict': (args) => { simpleSearch('dictionary.com', '/browse/', encodeArgs(args)); },

  // Thesaurus
  'thes': (args) => { simpleSearch('thesaurus.com', '/browse/', encodeArgs(args)); },

  // Color settings
  'bgColor': (args) => {
    //TODO
  },

  'textColor': (args) => {
    //TODO
  }
}

function simpleSearch(url: string, search: string, args: Array<string>) {
  let destination = url;

  if (args.length > 0 && args[0] !== '') {
    destination += search + args[0];
  }

  redirect(destination);
}

function interpret() {
  let inputBox = $('#input');
  let input = inputBox.val();
  inputBox.select();

  // Input is empty
  if (input == '') {
    return;
  }

  // Input is a URL
  if (/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(input)) {
    if !(input.includes(' ')) {
      redirect(input);
      return false;
    }
  }

  // Parse & format input
  let args = input.split(';');
  let command = args[0].trim();
  args = args.slice(1, args.length);

  for (let i=0; i < args.length; i++) {
    args[i] = args[i].trim();
  }

  // Execute
  let keys = Object.keys(COMMANDS);
  for (let i=0; i < keys.length; i++) {
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

function encodeArgs(args: Array<string>, alt:number = 0): Array<string> {
  if (alt) {
    for (let i=0; i < args.length; i++) {
      args[i] = args[i].replace(/ /g, '+'); // replace spaces with plus signs
    }
  } else {
    for (let i=0; i < args.length; i++) {
      args[i] = encodeURIComponent(args[i]); // uri encode
    }
  }
  return args;
}

function handleKeyDown(e) {
  let keycode: number;
  if (window.event) {
    keycode = window.event.keyCode;
  } else if (e) {
    keycode = e.which;
  }

  if (keycode == 13) { // Enter key
    interpret();
  }
}
