# Build stage for frontend
FROM node:18 AS client-build
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/src ./src
COPY client/public ./public
RUN npm run build

# Build stage for backend
FROM node:18 AS backend
WORKDIR /app/server
COPY server/package*.json ./
RUN npm install
COPY server/index.js ./

# Final stage
FROM node:18
WORKDIR /app
COPY --from=backend /app/server ./server
COPY --from=client-build /app/client/build ./client/build

EXPOSE 5000
CMD ["node", "server/index.js"]
