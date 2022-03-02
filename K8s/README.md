# Web-App deployment with Kubernetes

[Kubernetes (K8s)](https://kubernetes.io/) is a portable, extensible, open-source platform for managing containerized workloads and services, that facilitates both declarative configuration and automation. It has a large, rapidly growing ecosystem and it is used for managing containerized application in different deployment environments.

[Minikube](https://minikube.sigs.k8s.io/docs/start/) is one node Kubernetes cluster where Master processes and Worker processes both work on one Node. This node will have a Docoker container runtime pre-installed. So you will be able to run the containers or the pods with containers on this node.

- creates a Virtual Box on the local machine
- node cluster will run in the Virtual Box
- used for testing K8s locally

The command line tool (CLI) for K8s cluster is [Kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl). It enables interaction with cluster by talking to API Server with command lines, user being able to create pods, services and other components.

\- Minikube CLI is used to start/delete a K8s cluster.</br>
\- Kubeclt CLI is used for configuring the Minikube cluster.

# Setup

1. Install Docker for container management to allow to start a K8s cluster using the docker driver

2. Install Minikube and Kubectl

3. Start a local Kubernetes cluster, that pulls a base image, then creates a docker container from it (allocating for it 2 CPUs cores and 2200MB RAM memory) and runs the container:

`minikube start --driver=docker` </br>
`minicube status` -> get the status </br>

`kubectl get nodes` -> verify the nodes (needs to apear minikube) </br>
`kubectl get services` -> verify the services </br>
`kubectl cluster-info`

4. Create different Kubernetes components by sending the requests with _YAML_ files:

## [Pod](/K8s/pod.yml)

Pods are the basic building blocks of Kubernetes ant the simplest deployable unit. We usually will nod create pods separately. Pods are created using  deployments, jobs, etc.

From my built with Docker app image, I created static pod by using pod manifest yaml file and commands:

`kubectl create -f pod.yml `

`kubectl get pods`

Next command is used to access the pod inside the running container with a shell, from where we can see that webpage of app is running or not by seeing the contents of web-app with 'curl':

`kubectl exec -it webapp /bin/sh`

`/usr/share/nginx/html # curl localhost`

## [Deployment](/K8s/deployment.yml)

Deployment is an abstraction layer over the pods. Pod is the smallest unit of K8s cluster. We are not working with the pods directly, we use deployment that creates the pods underneath.

In the specification of deployment yaml file I set to be created 3 replicas of pods, but one of it is pending because of the limits of resources allowed to run I setted.

## [Service](/K8s/service.yml)

Service points to the Pods directly and skips the Deployment altogether. It finds the pods that is gonna attach to using the selector field in yaml to connect to pod through label. Also, in yaml configuration file we need to set the service/host port to be exposed and the target port to match the container port of deployment.

In my yaml file for service, I put the option to automatically create a cloud load balancer. This provides an externally-accessible IP address that sends traffic to the correct port on cluster nodes, given the fact that my cluster will run in a supported environment and is configured with the nginx server which provides load balancing.

![Kubectl show pods & services](/K8s/kubectl_get.png)

After creating the deployment replicas pods over containers of my web application image is running in Minikube cluster. Now it is possible to access the webpage of my running app from by connecting with http to the IP of minikube with the node port set in the service yaml file:

`minikube ip` -> gets the ip

`http://192.168.49.2:30000/` -> address to connect to web-app

![Web-app image](/K8s/webapp_game.png)