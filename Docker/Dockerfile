## Stage 1: Build linux distribution
# base image 
FROM alpine:3.15 AS builder

# directory is created inside the container
RUN mkdir -p /home/web-app

# copy [-sorce to -dest] files from host inside container image 
# (executes on the host machine)
COPY ./App /home/web-app 

# set the working directory
WORKDIR /home/web-app

# execute commands on top of the current image to see copied files
RUN ls -l


## Stage 1: Run nginx to serve application
FROM nginx:alpine

#copies files from previous image stage into a new directory image 
COPY --from=builder /home/web-app /usr/share/nginx/html

# see the copied files
WORKDIR /usr/share/nginx/html/

# add read permission to index.html
RUN chmod +r index.html

RUN echo "Folder /usr/share/nginx/html/ contains:" \
    && ls -l

#default http port, to tell docker has a server running in this image
EXPOSE 80

# "nginx -g daemon off" will run as default command when any container 
#is run that uses the image that was build using this Dockerfile
CMD ["nginx", "-g", "daemon off;"]