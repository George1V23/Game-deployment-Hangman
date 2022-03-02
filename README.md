# Deployment of web game

I implemented a keystroke version of Hangman game with HTML, CSS and JavaScript, making a webpage without using any runtime-enviromnent or library.

From this web game, I build an image and made a containerized application by using Docker. Using Kubernetes I made deployment of the image of my containerized application on Minikube cluster.

## [App](/App/README.md)

My web-app browser game, dependencies are in the [`/App`](/App/) folder.

## [Docker](/Docker/README.md)

Dockerfile for container image of my web app to run on Nginx web server on top of a linux distribution are in the [`/Docker`](/Docker) folder.

## [K8s](/K8s/README.md)

In [`/K8s`](/K8s/) file are Kubernetes YAML manifests: `Pod`, `Deployment` and `Service`.