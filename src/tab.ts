let SETTINGS: object;
let NEW_TAB: boolean = false;

window.onload = () => {
  loadSettings();
  applySettings();

  document.body.addEventListener('click', () => { document.querySelector('#input').focus(); }
}

const COMMANDS = {
  // Google
  'g': (args) => { redirect('google.com', '/search?q=', undefined, encodeArgs(args)) },

  //Reddit
  'r': (args) => {
    const url = 'https://reddit.com', search = '/r/';
    let query = (args.length > 0) ? args[0] : '';

    const validSort = (arg) => { return (['hot', 'new', 'rising', 'controversial', 'top', 'gilded', 'wiki', 'promoted'].includes(arg)) };
    const validRange = (arg) => { return (['day', 'week', 'month', 'year', 'all'].includes(arg)) };

    switch(args.length) {
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
        } else {
          query += (validSort(args[1]))
            ? '/' + args[1]
            : '';
        }
        break;
    }
    redirect(url, search, query, undefined);
  },

  // DuckDuckGo
  'dg': (args) => { redirect('https://duckduckgo.com', '/?q=', undefined, encodeArgs(args)) },

  // YouTube
  'y': (args) => {
    const url = 'https://youtube.com'; const search = '/results?search_query=';
    args = encodeArgs(args);

    switch(args.length) {
      case 0:
        redirect(url);
        break;
      case 1:
        if (args[0] == 'subs') {
          redirect(url, '', '/feed/subscriptions', undefined);
        } else {
          redirect(url, search, undefined, args)
        }
        break;
    }
  },

  // Amazon
  'a': (args) => { redirect('https://smile.amazon.com', '/s/?field-keywords=', undefined, encodeArgs(args)) },

  // Wikipedia
  'w': (args) => { redirect('https://wikipedia.org', '/w/index.php?title=Special:Search&search=', undefined, encodeArgs(args, 1)) },

  // GitHub
  'gh': (args) => { redirect('https://github.com', '/', undefined, args) },

  // GitHub Gist
  'gist': (args) => { redirect('https://gist.github.com', '/search?q=', undefined, encodeArgs(args)) },

  // Wolfram Alpha
  'wa': (args) => { redirect('wolframalpha.com', '/input/?i=', undefined, encodeArgs(args)) },

  // Netflix
  'n': (args) => { redirect('https://netflix.com', '/search?q=', undefined, encodeArgs(args)) },

  // Internet Movie Database
  'imdb': (args) => { redirect('imdb.com', '/find?s=all&q=', undefined, encodeArgs(args)) },

  // Google Maps
  'gm': (args) => { redirect('https://maps.google.com', '/maps?q=', undefined, encodeArgs(args)) },

  // Google Drive
  'gd': (args) => { redirect('https://drive.google.com', '/drive/search?q=', undefined, encodeArgs(args)) },

  // Google Calendar
  'gc': (args) => { redirect('https://calendar.google.com', '', '', undefined) },

  // Google Images
  'img': (args) => { redirect('https://google.com', '/search?tbm=isch&q=', undefined, encodeArgs(args)) },

  // Inbox
  'i': (args) => {
    const url = 'https://inbox.google.com'; const search = '/search/';
    args = encodeArgs(args);

    switch(args.length) {
      case 0:
        redirect(url);
        break;
      case 1:
        if (args[0] == 'snoozed') {
          redirect(url + '/snoozed');
        } else if (args[0] == 'done') {
          redirect(url + '/done');
        } else {
          redirect(url, search, undefined, args);
        }
        break;
    }
  },

  // Keep
  'k': (args) => { redirect('https://keep.google.com', '/#search/text=', undefined, encodeArgs(args)) },

  // Dictionary
  'dict': (args) => { redirect('dictionary.com', '/browse/', undefined, encodeArgs(args)) },

  // Thesaurus
  'thes': (args) => { redirect('thesaurus.com', '/browse/', undefined, encodeArgs(args)) },

  // Help
  'help': (args) => { redirect('https://github.com/koryschneider/mintab/blob/master/doc/commands.md', undefined, undefined, undefined, true) },

  // Settings
  'set': (args) => {
    const validHex = (v) => { return /^#[0-9a-f]{3}(?:[0-9a-f]{3})?$/i.test(v) }

    if (Object.keys(SETTINGS).includes(args[0])) {
      switch(args.length) {
        case 1:
          // No value given, print current value
          displayMessage(args[0] + ': ' + SETTINGS[args[0]], 8000);
          break;
        case 2:
          // Set value
          if (args[0] == 'defaultCommand') {
            if (Object.keys(COMMANDS).includes(args[1])) {
              SETTINGS['defaultCommand'] = args[1];
            } else {
              displayMessage('Error: command "' + args[1] + '" not found; default command not changed', 5000);
            }

          } else if (args[0] == 'bgColor') {
            if (validHex(args[1])) {
              SETTINGS['bgColor'] = args[1];
            } else {
              displayMessage('Error: invalid hex value', 5000);
            }

          } else if (args[0] == 'textColor') {
            if (validHex(args[1])) {
              SETTINGS['textColor'] = args[1];
            } else {
              displayMessage('Error: invalid hex value', 5000);
            }
          }
          break;
      }
    } else if (args[0] == 'defaults') {
      localStorage.removeItem('settings');
      loadSettings();
      displayMessage('Settings reset to defaults', 5000);
    }
    saveSettings();
    applySettings();
  }
}

function interpret(): void {
  let input = document.querySelector('#input').value.trim();
  document.querySelector('#input').value = '';

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
  const args: Array<string> = input.split(';');
  const command: string = args[0].trim();

  for (let i=0; i < args.length; i++) {
    args[i] = args[i].trim();
  }

  let validCommand: boolean = false;
  let keys = Object.keys(COMMANDS);
  for (let i=0; i < keys.length; i++) {
    if (command == keys[i]) {
      validCommand = true;
    }
  }

  // Execute
  if (validCommand) {
    args.slice(1, args.length); // remove command

    if (args.length > 1 && args[args.length - 1] === 'n') {
      NEW_TAB = true;
      args.splice(args[args.length - 1], 1);
    }

    COMMANDS[command](args);
  } else {
    COMMANDS[SETTINGS['defaultCommand']](args);
  }
}

function redirect(url: string, search?: string, query?: string, args?: Array<string>, newtab: boolean = false): boolean {
  let destination: string;

  if (!/(http(s)?:\/\/.)/.test(url)) {
    destination = 'http://' + url;
  } else {
    destination = url;
  }

  if (query) {
    destination += search + query;
  } else if (args) {
    if (args.length > 0 && args[0] !== '') {
      destination += search + args[0];
    }
  }

  if (newtab || NEW_TAB) {
    window.open(destination).focus();
  } else {
    window.location.href = destination;
  }
  return false;
}

function encodeArgs(args: Array<string>, alt: number = 0): Array<string> {
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
  document.querySelector('body').style.backgroundColor = SETTINGS['bgColor'];
  document.querySelector('body').style.color = SETTINGS['textColor'];
}

function saveSettings(): void {
  localStorage.setItem('settings', JSON.stringify(SETTINGS));
}

let timer; // Timer must be global in order to cancel timeout
function displayMessage(msg: string, timeMs: number): void {
  const msgDiv = document.querySelector('#message');

  // Clear any existing message
  if (timer) {
    msgDiv.innerHTML = '';
    clearTimeout(timer);
  }

  // Display message
  msgDiv.innerHTML = msg;

  // Set timer
  timer = setTimeout(() => {
    msgDiv.innerHTML = '';
  }, timeMs);
}

function handleKeyDown(e): void {
  let keycode: number = e.which || e.keyCode;
  if (keycode == 13) { // Enter key
    interpret();
  }
}
