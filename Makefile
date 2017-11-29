JS_RESOURCES = $(shell find assets/js -name '*.js')
CSS_RESOURCES = $(shell find assets/css -name '*.css')
IMAGE_RESOURCES = $(shell find assets/img -type f)
HTML_RESOURCES = $(shell find assets/html -type f)

all: clean strava_helper_firefox.zip strava_helper_chrome.zip

strava_helper_firefox.zip: $(JS_RESOURCES) $(CSS_RESOURCES) $(IMAGE_RESOURCES) $(HTML_RESOURCES) manifest_firefox
	zip $@ $(JS_RESOURCES) $(CSS_RESOURCES) $(IMAGE_RESOURCES) $(HTML_RESOURCES) manifest.json

strava_helper_chrome.zip: $(JS_RESOURCES) $(CSS_RESOURCES) $(IMAGE_RESOURCES) $(HTML_RESOURCES) manifest_chrome
	zip $@ $(JS_RESOURCES) $(CSS_RESOURCES) $(IMAGE_RESOURCES) $(HTML_RESOURCES) manifest.json

manifest_firefox:
	cp manifest.firefox.json manifest.json

manifest_chrome:
	cp manifest.chrome.json manifest.json

clean:
	rm -f strava_helper_firefox.zip
	rm -f strava_helper_chrome.zip
	rm -f manifest.json

.PHONY: all
.PHONY: clean
.PHONY: manifest_chrome
.PHONY: manifest_firefox
