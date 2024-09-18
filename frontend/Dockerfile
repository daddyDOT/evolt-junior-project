# Use Node.js base image
FROM node:20-alpine

# Create app directory inside the container
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy all frontend files
COPY . .

# Build the Next.js frontend
RUN npm run build

# Expose the frontend port (3000 in this case)
EXPOSE 3000

# Start the frontend (Next.js)
CMD ["npm", "start"]
