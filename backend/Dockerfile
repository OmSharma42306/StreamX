# FROM node:18


# # Setting Working Directory.
# WORKDIR /app
# # Copy the rest application code
# COPY ./ ./
# # Install Dependencies
# RUN npm install 
# # Install FFmpeg for video processing
# RUN apt-get update && apt-get install -y ffmpeg 

# # Expose the WebSocket Server listens on
# EXPOSE 8080

# # Start the WebSocket Server

# CMD ["node","dist/index.js"]




# Use Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Install TypeScript globally
RUN npm install -g typescript

# Copy all files to the container
COPY ./ ./

# Compile TypeScript to JavaScript
RUN tsc

# Expose the port
EXPOSE 8080

# Start the compiled JavaScript file
CMD ["node", "dist/index.js"]
