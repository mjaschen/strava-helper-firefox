JS_RESOURCES = $(shell find assets/js -name '*.js')
CSS_RESOURCES = $(shell find assets/css -name '*.css')
IMAGE_RESOURCES = $(shell find assets/img -type f)
HTML_RESOURCES = $(shell find assets/html -type f)

.PHONY: all
all: clean strava_helper_firefox.zip strava_helper_chrome.zip strava_helper_edge.zip

strava_helper_firefox.zip: $(JS_RESOURCES) $(CSS_RESOURCES) $(IMAGE_RESOURCES) $(HTML_RESOURCES) manifest_firefox
	zip $@ $(JS_RESOURCES) $(CSS_RESOURCES) $(IMAGE_RESOURCES) $(HTML_RESOURCES) manifest.json

strava_helper_chrome.zip: $(JS_RESOURCES) $(CSS_RESOURCES) $(IMAGE_RESOURCES) $(HTML_RESOURCES) manifest_chrome
	zip $@ $(JS_RESOURCES) $(CSS_RESOURCES) $(IMAGE_RESOURCES) $(HTML_RESOURCES) manifest.json

strava_helper_edge.zip: $(JS_RESOURCES) $(CSS_RESOURCES) $(IMAGE_RESOURCES) $(HTML_RESOURCES) manifest_edge
	zip $@ $(JS_RESOURCES) $(CSS_RESOURCES) $(IMAGE_RESOURCES) $(HTML_RESOURCES) manifest.json

.PHONY: manifest_firefox
manifest_firefox:
	cp manifest.firefox.json manifest.json

.PHONY: manifest_chrome
manifest_chrome:
	cp manifest.chrome.json manifest.json

manifest_edge:
	cp manifest.edge.json manifest.json

.PHONY: clean
clean:
	rm -f strava_helper_firefox.zip
	rm -f strava_helper_chrome.zip
	rm -f strava_helper_edge.zip
	rm -f manifest.json
