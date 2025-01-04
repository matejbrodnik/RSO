# FROM node:16

# WORKDIR /app

# COPY package*.json ./

# RUN npm install

# COPY . .

# EXPOSE 5173

# CMD ["npm", "run", "dev"]

# Step 1: Build the frontend
FROM node:16-alpine as builder
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the source code and build the frontend
COPY . .
RUN npm run build

# Step 2: Set up the Express.js server
FROM node:16-alpine
WORKDIR /app

# Copy build output and server code from the builder stage
COPY --from=builder /app/dist ./dist
COPY server.js ./

# Install only production dependencies for the server
COPY package.json package-lock.json ./
RUN npm install --production

# Expose port 80
EXPOSE 5174

# Run the server
CMD ["node", "server.js"]
