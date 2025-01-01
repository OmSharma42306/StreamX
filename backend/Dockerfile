FROM node:18-bullseye

# Install FFmpeg for video processing
RUN apt-get update && apt-get install -y ffmpeg && apt-get clean

# Install Node.js and npm
RUN apt-get install -y nodejs npm

# Setting Working Directory.
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install Dependencies
RUN npm install 

# 



# Copy the rest application code
COPY . .


# Build TypeScript file.
RUN npm run build

# Expose the WebSocket Server listens on
EXPOSE 8080

# Start the WebSocket Server

CMD ["node","dist/index.js"]



