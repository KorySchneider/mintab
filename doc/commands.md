## Usage

Type a command, then optionally add arguments (separrated by semicolons).
Commands are shortcuts for websites; enter a command by itself to go to the
corresponding website or add arguments to quickly get to traverse the site.

Some examples:

 - `y;cats` Search YouTube for 'cats'

 - `r;dadjokes;top` Go to the top posts of the DadJokes subreddit

 - `example.com` Go to example.com

Leading and trailing spaces will be stripped, so `y ; cats`, `y;cats` and `y;
cats` will all do the same thing (search YouTube for "cats").

If no command is specified, the default command will execute. The default,
default command is Google (use the `set` command to change this).

## Commands

Here are all the commands and what they do.

Arguments in [brackets] are optional. Vertical pipes (`|`) mean 'or'.

 - Builtin
   - [set](#set)
   - [help](#help)
   - [newtab](#new-tab)
 - Websites
   - [Google](#google)
   - [DuckDuckGo](#duckduckgo)
   - [Reddit](#reddit)
   - [GitHub](#github)
   - [GitHub Gist](#github-gist)
   - [YouTube](#youtube)
   - [Inbox](#inbox)
   - [Netflix](#netflix)
   - [Amazon](#amazon)
   - [Wikipedia](#wikipedia)
   - [Dictionary](#dictionary)
   - [Thesaurus](#thesaurus)
   - [Wolfram Alpha](#wolfram-alpha)
   - [Internet Movie Database](#internet-movie-database)
   - [Google Maps](#google-maps)
   - [Google Drive](#google-drive)
   - [Google Keep](#google-keep)
   - [Google Images](#google-images)
   - [Google Calendar](#google-calendar)

---

#### set
`set ;setting [;value]`

 - **setting** - One of: `defaultCommand`, `bgColor`, `textColor`. If no value
   is given, the current value will be displayed.
 - **value** - Either a hex value for `bgColor` or `textColor`, or a command
   shortcut (e.g. `y`) for `defaultCommand`.
 - `set;defaults` will restore default values for all options.

For example: `set;bgColor;#282828` or `set;defaultCommand;dg`

---

#### help
`help` - Opens this page.

---

#### new tab
Add `;n` to the end of any command to open the result in a new tab.

---

#### Google
`g [;query]`

 - **query** - Search Google for `query`.

---

#### DuckDuckGo
`dg [;query]`

 - **query** - Search DuckDuckGo for `query`.

---

#### Reddit
`r [;subreddit] [;sort] [;range]`

 - **subreddit** - Go to a subreddit.
 - **sort** - One of: `hot`, `new`, `rising`, `controversial`, `top`, `gilded`,
 `wiki`, `promoted`.
  - **range** - One of: `day`, `week`, `month`, `year`, `all`.

For example: `r;linux;top;week` goes to `reddit.com/r/linux/top?t=week`

---

#### GitHub
`gh [;github path]`

 - **github path** - Anything that normally comes after `github.com`.

For example: `gh;koryschneider/mintab` or `gh;new`

---

#### GitHub Gist
`gist [;query]`

 - **query** - Search Gists for `query`.

---

#### YouTube
`y [;query | subs]`

 - **query** - Search YouTube for `query`.
 - **subs** - Go to your subscriptions feed.

---

#### Inbox
`i [;query | snoozed | done]`

 - **query** - Search your inbox for `query`.
 - **snoozed** - Go to your snoozed emails.
 - **done** - Go to your done (archived) emails.

---

#### Netflix
`n [;query]`

 - **query** - Search Netflix for `query`.

---

#### Amazon
`a [;query]`

 - **query** - Search Amazon for `query`.

---

#### Wikipedia
`w [;query]`

 - **query** - Search Wikipedia for `query`.

---

#### Dictionary
`dict [;query]`

 - **query** - Search dictionary.com for `query`.

---

#### Thesaurus
`thes [;query]`

 - **query** - Search thesaurus.com for `query`.

---

#### Wolfram Alpha
`wa [;query]`

 - **query** - Search Wolfram Alpha for `query`.

---

#### Internet Movie Database
`imdb [;query]`

 - **query** - Search Internet Movie Database for `query`.

---

#### Google Maps
`gm [;query]`

 - **query** - Search Google Maps for `query`.

---

#### Google Drive
`gd [;query]`

 - **query** - Search Google Drive for `query`.

---

#### Google Keep
`k [;query]`

 - **query** - Search Google Keep for `query`.

---

#### Google Images
`img [;query]`

 - **query** - Search Google Images for `query`.

---

#### Google Calendar
`gc` - Go to Google Calendar
