FROM node

WORKDIR /code

# Gotta keep the npm happy
RUN npm install -g npm@next

RUN npm i cw-sdk-node

COPY . .

ARG API_KEY
ARG SECRET_KEY

CMD [ "node", "firehose.js" ]

