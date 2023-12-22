FROM brainbeanapps/nodejs-build-environment:latest as builder
COPY --chown=user:user . /tmp/hkh-webapp/
WORKDIR /tmp/hkh-webapp
ENV PUBLIC_URL /
ENV NODE_ENV development
RUN npm install && \
    npm run lint && \
    npm run compile && \
    npm run test

FROM node:10-slim
WORKDIR /webapp
COPY --from=builder /tmp/hkh-webapp/build .
COPY package.json package-lock.json ./
RUN npm install --only=production && npm install -g serve
ENTRYPOINT ["serve", "-s"]
EXPOSE 5000
