.PHONY: clean

JS_RESOURCES = $(shell find assets/js -name '*.js')
CSS_RESOURCES = $(shell find assets/css -name '*.css')
IMAGE_RESOURCES = $(shell find assets/img -type f)

strava_helper.zip: $(JS_RESOURCES) $(CSS_RESOURCES) $(IMAGE_RESOURCES) manifest.json
	zip $@ $^

clean:
	rm -f strava_helper.zip
