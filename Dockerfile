FROM node:22.21-alpine AS base
WORKDIR /app

COPY package*.json ./
RUN npm ci && npm cache clean --force
COPY . .

EXPOSE 3000

#Development Image
FROM base AS development
ENV NODE_ENV=development
CMD ["npm", "run", "dev"]
