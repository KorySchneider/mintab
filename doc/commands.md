General syntax: `command ; argument ; argument2 ; ...`

Enter a command by itself to go to the corresponding website, or add a
query to search the site.

Arguments are separated by semicolons (`;`). Leading/trailing spaces will be
stripped, so `y; cats` will do the same thing as `y;cats`.

If no command is specified, the default command will execute. The default, default
command is Google (use the `set` command to change this).

Enter a URL by itself to go to it.

## Contents:
 - Non-shortcut commands
   - [set](#set)
   - [help](#help)
 - Commands
   - [Google](#google)
   - [DuckDuckGo](#duckduckgo)
   - [Reddit](#reddit)
   - [GitHub](#github)
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

## Non-shortcut commands:

### Set
`set ;setting [;value]`

 - **setting** - One of: `defaultCommand`, `bgColor`, `textColor`. If no value
   is given, the current value will be displayed.
 - **value** - Either a hex value for `bgColor` or `textColor`, or a command
   shortcut (e.g. `y`) for `defaultCommand`.
 - `set;defaults` will restore default values for all options.

Examples: `set;bgColor;#282828`, `set;defaultCommand;dg`

### Help
`help` - Opens this page.

## Shortcut commands:

### Google
`g [;query]`

 - **query** - Search Google for `query`.

### DuckDuckGo
`dg [;query]`

 - **query** - Search DuckDuckGo for `query`.

### Reddit
`r [;subreddit] [;sort] [;range]`

 - **subreddit** - Go to a subreddit.
 - **sort** - One of: `hot`, `new`, `rising`, `controversial`, `top`, `gilded`,
 `wiki`, `promoted`.
  - **range** - One of: `day`, `week`, `month`, `year`, `all`.

Example: `r;linux;top;week` goes to `reddit.com/r/linux/top?t=week`

### GitHub
`gh [;user] [;repository]`

 - **user** - A GitHub username.
 - **repository** - A repository name, owned by `user`.

### YouTube
`y [;query | subs]`

 - **query** - Search YouTube for `query`.
 - **subs** - Go to your subscriptions feed.

### Inbox
`i [;query | snoozed | done]`

 - **query** - Search your inbox for `query`.
 - **snoozed** - Go to your snoozed emails.
 - **done** - Go to your done (archived) emails.

### Netflix
`n [;query]`

### Amazon
`a [;query]`

### Wikipedia
`w [;query]`

### Dictionary
`dict [;query]`

### Thesaurus
`thes [;query]`

### Wolfram Alpha
`wa [;query]`

### Internet Movie Database
`imdb [;query]`

### Google Maps
`gm [;query]`

### Google Drive
`gd [;query]`

### Google Keep
`k [;query]`

### Google Images
`img;query`

### Google Calendar
`gc`
