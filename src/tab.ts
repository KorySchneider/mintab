window.onload = () => {
}

// Load settings
try {
  let SETTINGS = JSON.parse(localStorage.getItem('settings'));
} catch(e) {
  loadSettings(); // will create defaults if first time on page
}

// Commands
function default_cmd(args) {
  switch(args.length) {
    case 1:
      query = 
  }
}

function r_cmd(args) {
}

// Shortcuts
const shortcuts = {
  'g': default_cmd,
  'r': r_cmd
}

function loadSettings() {
  //TODO
}

function saveSettings() {
  //TODO
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

  // Parse & execute
  let args = input.split(';');
  let command = args[0];
  args = args.slice(1, args.length);

  for (let i=0; i < shortcuts.length; i++) {
    if (command == shortcuts[i]) {
      shortcuts[i](args);
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
