# Step 1: Use the official Node.js image
FROM node:14

# Step 2: Create and set the app directory
WORKDIR /usr/src/app

# Step 3: Copy package.json and install dependencies
COPY package*.json ./
RUN npm install --only=production

# Step 4: Copy the rest of the app source code
COPY . .

# Step 5: Expose the port the app runs on
EXPOSE 4000

# Step 6: Command to run the app
CMD ["node", "index.js"]
