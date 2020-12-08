run: build
	docker run --env API_KEY=${API_KEY} --env SECRET_KEY=${SECRET_KEY} cryptowatch-sdk-js-firehose

build:
	docker build -t cryptowatch-sdk-js-firehose .
