# Use Node.js base image
FROM node:20-alpine

# Create app directory inside the container
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy all backend files
COPY . .

# Expose the backend port (5000 in this case)
EXPOSE 5000

# Start the server
CMD ["node", "index.js"]
