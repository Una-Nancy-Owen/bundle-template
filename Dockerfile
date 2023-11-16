FROM node:18-slim AS base

RUN apt-get update \
    && apt-get install git -y

ARG NODE_ENV=production

WORKDIR /nodecg

RUN npm install -g nodecg-cli \
	&& nodecg setup

FROM node:18-slim AS builder

WORKDIR /bundleBuilder

COPY . ./

RUN npm install \
    && npm run build

FROM node:18-slim AS runner

WORKDIR /nodecg

RUN addgroup --system nodecg \
	&& adduser --system nodecg --ingroup nodecg \
	&& mkdir -p cfg bundles logs db assets \
	&& chown -R nodecg:nodecg /nodecg

COPY --chown=nodecg:nodecg --from=base /nodecg .
COPY --chown=nodecg:nodecg --from=builder /bundleBuilder/node_modules /nodecg/bundles/bundle-template/node_modules
COPY --chown=nodecg:nodecg --from=builder /bundleBuilder/dashboard /nodecg/bundles/bundle-template/dashboard
COPY --chown=nodecg:nodecg --from=builder /bundleBuilder/extension /nodecg/bundles/bundle-template/extension
COPY --chown=nodecg:nodecg --from=builder /bundleBuilder/graphics /nodecg/bundles/bundle-template/graphics
COPY --chown=nodecg:nodecg --from=builder /bundleBuilder/assets /nodecg/bundles/bundle-template/assets
COPY --chown=nodecg:nodecg --from=builder /bundleBuilder/package.json /nodecg/bundles/bundle-template/package.json

VOLUME /nodecg/cfg /nodecg/bundles /nodecg/logs /nodecg/db /nodecg/assets

EXPOSE 9090/tcp

CMD ["node", "/nodecg/index.js"]
