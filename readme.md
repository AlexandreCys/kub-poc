# Poc with kubernetes

## prerequisistes

- Minikube
- Docker

## POC

GatewayService <-- http --> ProductService
               <-- grpc --> SecurityService

## How to

1. use minikube docker 
``` eval $(minikube docker-env) ```
2. Be sure to always put a version on your docker image
3. Deploy on Kubernetes using the deploy.yaml file 
``` kubectl create -f deploy.yaml ```
4. Create the service on kubernetes using the svc.yaml file
``` kubectl create -f svc.yaml ```
5. Get your Kubernetes node IP: ``` kubectl cluster-info ``` and use the service NodePort to connect to your service

## usefull commands

- ``` kubectl get pods ``` list all the pods
- ``` kubectl describe pod xyz ``` show info for a pod
- ``` kubectl get services ```
- ``` kubectl describe service xyz ```
