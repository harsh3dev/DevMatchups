# Use a Node.js image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Install Prisma CLI globally to ensure it's available for migrations
RUN npm install -g prisma

# Copy the rest of the application files
COPY . .

# Generate Prisma Client (run this after copying the full project to ensure all files are available)
RUN npx prisma generate

# Build the Next.js application
RUN npm run build

# Expose the application port
EXPOSE 3000

# Command to run the app
CMD ["npm", "run", "start"]