# Change Log

All notable changes to `mjaschen/strava-helper-firefox` will be documented in this file.
Updates should follow the [Keep a CHANGELOG](http://keepachangelog.com/) principles.

## [1.1.2] - 2021-08-05

### Fixed

- adjustments to manifest schema version 3 (Edge)

## [1.1.1] - 2021-08-03

### Fixed

- restore handling of old selectors because the new markup isn't available for all users yet, see [issue comment](https://github.com/mjaschen/strava-helper-chrome/issues/2#issuecomment-891251355)

## [1.1.0] - 2021-08-02

### Fixed

- adjustments for Strava's new page markup (“Give Kudos to All”, remove Challenges from feed)

## [1.0.0] - 2021-07-29

### Added

- available as native Edge Extension

### Changed

- update jQuery to 3.6.0
- show Kudos count for 5 seconds after clicking the icon

## [0.13.1] - 2021-04-13

### Fixed

- save *Peloton* filter option works now. Thanks @wwcsig

## [0.13.0] - 2020-12-30

### Added

- *Peloton* activities can be removed from feed. Thanks @wwcsig

## [0.12.0] - 2020-10-20

(no changes, tagged for resubmitting @ Chrome Web Store)

## [0.11.0] - 2020-09-04

### Fixed

- removing Zwift activities works again

## [0.10.0] - 2020-05-25

### Changed

- remove the `activeTab` permission (Chrome version)

## [0.9.0] - 2020-05-25

### Added

- Achievement Celebrations are removed from the feed if the "Remove challenges from the feed" setting is enabled.

## [0.8.2] - 2019-10-15

### Added

- Include upsell container on activity pages when removing promo stuff

## [0.8.1] - 2019-08-27

### Fixed

- Commutes are removed in the German translation

## [0.8.0] - 2019-08-20

### Fixed

- Wahoo ELEMNT Bolt activities are no longer removed when the ZWIFT filter is enabled

## [0.7.0] - 2019-05-31

### Changed

- update Firefox permission requirements

## [0.6.0] - 2018-01-05

### Added

- activities tagged as "Commute" can be removed from the feed (see Preferences/Options)
- "Performance Goals" can be removed from the feed (see Preferences/Options)

## [0.5.2] - 2017-10-30
## [0.5.1] - 2017-10-30

### Fixed

- fix installation error in Chrome: “Package is invalid. Could not load options page.”

## [0.5.0] - 2017-10-26

### Added

- The options are back!

### Changed

- Many adjustments to the new Strava design.

## [0.4.3] - 2017-09-03

### Added

- Remove promos for Strava Premium from feed

## [0.4.2] - 2017-08-24

### Fixed

- Sticky navbar did not work on activity pages

## [0.4.1] - 2017-08-21

### Fixed

- Sticky navbar was not sticky

## [0.4.0] - 2017-08-21

### Changed

- Migrate the code to “Web Extension”
- New icon for the extension

### Added

- Support for Chrome

### Removed

- Autoloading new entries in timelines (Strava implemented that feature in the meantime)
