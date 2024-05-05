FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

RUN npm install

# Copy the rest of the application
COPY . .

# Expose the application's port
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]
