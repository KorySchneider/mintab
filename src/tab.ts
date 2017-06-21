let SETTINGS: object;

window.onload = () => {
  loadSettings();
  applySettings();

  $('body').click(() => { $('#input').focus() });
}

const COMMANDS = {
  // Google
  'g': (args) => { simpleSearch('google.com', '/search?q=', encodeArgs(args)) },

  //Reddit
  'r': (args) => { simpleSearch('reddit.com', '/r/', args) },

  // DuckDuckGo
  'dg': (args) => { simpleSearch('duckduckgo.com', '/search?q=', encodeArgs(args)) },

  // YouTube
  'y': (args) => { simpleSearch('youtube.com', '/results?search_query=', encodeArgs(args)) },

  // Amazon
  'a': (args) => { simpleSearch('smile.amazon.com', '/s/?field-keywords=', encodeArgs(args)) },

  // Wikipedia
  'w': (args) => { simpleSearch('wikipedia.org', '/w/index.php?title=Special:Search&search=', encodeArgs(args, 1)) },

  // GitHub
  'gh': (args) => { simpleSearch('github.com', '/search?q=', encodeArgs(args)) },

  // Wolfram Alpha
  'wa': (args) => { simpleSearch('wolframalpha.com', '/input/?i=', encodeArgs(args)) },

  // Netflix
  'n': (args) => { simpleSearch('netflix.com', '/search?q=', encodeArgs(args)) },

  // Internet Movie Database
  'imdb': (args) => { simpleSearch('imdb.com', '/find?s=all&q=', encodeArgs(args)) },

  // Google Maps
  'gm': (args) => { simpleSearch('maps.google.com', '/maps?q=', encodeArgs(args)) },

  // Google Drive
  'gd': (args) => { simpleSearch('drive.google.com', '/drive/search?q=', encodeArgs(args)) },

  // Google Calendar
  'gc': (args) => { simpleSearch('calendar.google.com', '', []) },

  // Google Images
  'img': (args) => { simpleSearch('google.com', '/search?tbm=isch&q=', encodeArgs(args)) },

  // Inbox
  'i': (args) => { simpleSearch('inbox.google.com', '/search/', encodeArgs(args)) },

  // Keep
  'k': (args) => { simpleSearch('keep.google.com', '/#search/text=', encodeArgs(args)) },

  // Dictionary
  'dict': (args) => { simpleSearch('dictionary.com', '/browse/', encodeArgs(args)) },

  // Thesaurus
  'thes': (args) => { simpleSearch('thesaurus.com', '/browse/', encodeArgs(args)) },

  // Settings
  'set': (args) => {
    // TODO
    // syntax:
    // set <setting> <value>
  }
}

function interpret(): void {
  let input: string = <string>$('#input').val();

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
  let args: Array<string> = input.split(';');
  let command: string = args[0].trim();

  for (let i=0; i < args.length; i++) {
    args[i] = args[i].trim();
  }

  // Execute
  let validCommand: boolean = false;

  let keys = Object.keys(COMMANDS);
  for (let i=0; i < keys.length; i++) {
    if (command == keys[i]) {
      validCommand = true;
    }
  }

  if (validCommand) {
    args = args.slice(1, args.length);
    COMMANDS[command](args);
  } else {
    COMMANDS[SETTINGS['defaultCommand']](args);
  }
}

function simpleSearch(url: string, search: string, args: Array<string>): void {
  let destination = url;

  if (args.length > 0 && args[0] !== '') {
    destination += search + args[0];
  }

  redirect(destination);
}

function redirect(url: string): boolean {
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

function loadSettings(): void {
  if (typeof(Storage)) {
    // Create settings object if it doesn't exist
    if (localStorage.getItem('settings') == null) {
      let defaultSettings = {
        'defaultCommand': 'g',
        'bgColor': '#282828',
        'textColor': '#ebdbb2'
      };
      localStorage.setItem('settings', JSON.stringify(defaultSettings));
    }

    SETTINGS = JSON.parse(localStorage.getItem('settings'));
  }
}

function applySettings(): void {
  $('body').css('background-color', SETTINGS['bgColor']);
  $('body').css('color', SETTINGS['textColor']);
}

function saveSettings(): void {
  localStorage.setItem('settings', JSON.stringify(SETTINGS));
}

function handleKeyDown(e): void {
  let keycode: number = e.which || e.keyCode;
  if (keycode == 13) { // Enter key
    interpret();
  }
}
