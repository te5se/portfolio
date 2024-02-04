 
# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:18 as build

WORKDIR /usr/local/app

# Install app dependencies
COPY package.json /usr/local/app/
run npm uninstall cypress
RUN npm install
# Set the working directory

# Add the source code to app
COPY ./ /usr/local/app/

RUN npx ng build --base-href=/portfolio/front/

# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest

# Not /etc/nginx/nginx.conf
COPY ./nginx_conf/nginx.conf /etc/nginx/conf.d/default.conf 
# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/local/app/dist/portfolio-project /usr/share/nginx/html

# Expose port 80
EXPOSE 80