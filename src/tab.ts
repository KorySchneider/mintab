window.onload = () => {
}

// Load settings
try {
  let SETTINGS = JSON.parse(localStorage.getItem('settings'));
} catch(e) {
  loadSettings(); // will create defaults if first time on page
}

function loadSettings() {
}

function saveSettings() {
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
}

function redirect(url) {
  window.location.href = url;
  return false;
}
