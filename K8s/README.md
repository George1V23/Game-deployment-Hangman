# Introduction of Kubernetes

[Kubernetes (K8s)](https://kubernetes.io/) is a portable, extensible, open-source platform for managing containerized workloads and services, that facilitates both declarative configuration and automation. It has a large, rapidly growing ecosystem. Kubernetes services, support, and tools are widely available.

[Minikube](https://minikube.sigs.k8s.io/docs/start/) is one node Kubernetes cluster where Master processes and Worker processes both work on one Node. This node will have a Docoker container runtime pre-installed. So you will be able to run the containers or the pods with containers on this node.

- creates a Virtual Box on the local machine
- node cluster will run in the Virtual Box
- used for testing K8s on your local setup

The command line tool (CLI) for K8s cluster is [Kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl). It enables interaction with cluster by talking to API Server with command lines, user being able to create pods, services and other components.

\- Minikube CLI is used to start/delete a K8s cluster.</br>
\- Kubeclt CLI is used for configuring the Minikube cluster.

# Setup

1. Install Minikube and Kubectl

2. Installing Docker for container management to allow to start a K8s cluster using the docker driver.

3. Start a local Kubernetes cluster, that pulls a base image, then creates a docker container from it (allocating for it 2 CPUs cores and 2200MB RAM memory) and runs the container.

`minikube start --driver=docker` </br>
`minicube status` -> get the status </br>

`kubectl get nodes` -> verify the nodes (needs to apear minikube) </br>
`kubectl get services` -> verify the services </br>
`kubectl cluster-info`

4. Create Kubernetes components:


## Deploy

Deployment is an abstraction layer over the pods. Pod is the smallest unit of K8s cluster. We are not working with the pods directly, we use deployment that creates the pods underneath

`kubectl create` 

## Pod

Create static pods using pod manifest yaml file.

Pods are the basic building blocks of Kubernetes ant the simplest deployable unit. We usually will nod create pods separately. Pods are created using  deployments, jobs, etc. 
