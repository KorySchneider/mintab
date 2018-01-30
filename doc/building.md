# Building

If you want to edit the mintab source code you will need to rebuild the project
to see your changes. The source code is found in the `src` folder. After making
changes run `$npm run build` in the root project directory. This will execute
`build.py`, which **requires python3**.

`build.py` does several things:

- Autoprefixes CSS
- Transpiles TypeScript
- Combines the HTML/CSS/JS
- Minifies the whole thing
- Writes to `index.html`

Open up `index.html` to see your changes.
