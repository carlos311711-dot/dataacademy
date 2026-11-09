FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Runtime con Node: sirve las páginas estáticas y la API del chatbot (/api/chat)
FROM node:22-alpine
WORKDIR /app
ENV HOST=0.0.0.0 PORT=80 NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
EXPOSE 80
# Pasa la key al correr el contenedor: docker run -e GEMINI_API_KEY=... -p 80:80 imagen
CMD ["node", "dist/server/entry.mjs"]
