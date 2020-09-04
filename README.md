# Strava Helper

This Firefox Add-on aims to provide some tweaks for the Strava Website.

## Give Kudos to All

A button in the upper left of every Strava page can be used to give Kudos to all visible activities. It saves you a lot of time and your Strava friends get the litte dose of motivation they deserve!

## Remove Clutter

Removes all social media and premium clutter from the dashboard and activity pages, such as:

- "Find friends"
- "Upcoming events"
- "Discover more"
- "Follow suggestions"
- the promotional footer at the bottom
- "Shop" link
- "Get Premium" link
- "Get Premium" box on dashboard
- "Get Premium" boxes on profile page
- Social media dropdown menu in activity feed
- "Create target" link
- Social media buttons on activity detail page and Flyby page
- Zwift activities
- Achievement celebrations in feed

## UI tweaks

- Adds a link to VeloViewer to the main navigation bar and on activity pages
- Adds a deep link to the VeloViewer activity details page (next to the Flyby link)

## Development

### Building

#### Build a Release

1. Update `CHANGELOG.md`
1. Increase the version number in `manifest.firefox.json` and `manifest.chrome.json`
1. Commit everything and create a tag in Git  
1. Create the distribution archives:

```shell
make all
```

The extension files `strava_helper_firefox.zip` and `strava_helper_chrome.zip` will be created in the current directory.

Upload the extensions:

- [Mozilla Add-on Developer Hub](https://addons.mozilla.org/en-US/developers/addons)
- [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole/)

#### Development Builds

```shell
web-ext run
```

Use a custom Firefox installation and profile:

```shell
web-ext run --firefox=/Applications/FirefoxNightly.app/Contents/MacOS/firefox-bin --firefox-profile=$HOME/Library/Application\ Support/Firefox/Profiles/\<PROFILE NAME\>
```

### Add a Setting to the Preferences

- add an input field with an unique ID to `assets/html/options.html`
- add the settings for that field to the `settings` object in `assets/js/strava_helper.options.js`

## Contributors

- [saesh](https://github.com/saesh)
- [Marcus Jaschen](https://www.marcusjaschen.de/)

## Disclaimer

This software is not endorsed by Strava. Please do not ask them for support.

The term STRAVA and the Strava logo are the exclusive trademarks of, and are owned by, Strava Inc.
