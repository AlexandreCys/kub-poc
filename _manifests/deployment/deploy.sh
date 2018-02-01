#!/bin/bash

# Version Name
if [ -z "$1" ]; then
    echo -e "\e[31m✘ Missing version\e[39m"
    exit 1
else
   VERSION=$1
fi

# Version Format
if [[ $VERSION =~ ^[0-9]{1}.[0-9]{1}$ ]]; then
    echo -e "\e[32m✔ Version valid \e[39m"
else
    echo -e "\e[31m✘ Version wrong format (0-9](1).[0-9](1)) \e[39m"
    exit 1
fi

# Minikube Running
if ps -ef | grep minikube | grep -v grep > /dev/null; then
    echo -e "\e[32m✔ Minikube running \e[39m"
    eval $(minikube docker-env)
else
    echo -e "\e[31m✘ Minikube stopped \e[39m"
    exit 1
fi

K8S_NAMESPACE=k8s

DEPLOY_GATEWAY_NAME=k8s/kub-poc-gateway:v$VERSION
DEPLOY_PRODUCT_NAME=k8s/kub-poc-product:v$VERSION
DEPLOY_SECURITY_NAME=k8s/kub-poc-security:v$VERSION

DEPLOY_GATEWAY_LOCATION=../../kub-poc-gateway
DEPLOY_PRODUCT_LOCATION=../../kub-poc-product
DEPLOY_SECURITY_LOCATION=../../kub-poc-security

SECRET_TOKEN_LOCATION=../secrets/public-token.yaml

# Confirmation
echo -e "\e[36m⚙ \e[32m> \e[34mService Gateway : ${DEPLOY_GATEWAY_NAME} \e[39m"
echo -e "\e[36m⚙ \e[32m> \e[34mService Product : ${DEPLOY_PRODUCT_NAME} \e[39m"
echo -e "\e[36m⚙ \e[32m> \e[34mService Security : ${DEPLOY_SECURITY_NAME} \e[39m"
read -p $'\e[36m⚙ \e[32m> \e[34mConfirm [y/n]?' CONT
if [ "$CONT" = "y" ]; then
  # Docker Build DEPLOY_GATEWAY_NAME
  echo -e "\e[36m⚙ Begin build of ${DEPLOY_GATEWAY_NAME} \e[39m"
  docker build -t $DEPLOY_GATEWAY_NAME $DEPLOY_GATEWAY_LOCATION/

  # Docker Build DEPLOY_PRODUCT_NAME
  echo -e "\e[36m⚙ Begin build of ${DEPLOY_PRODUCT_NAME} \e[39m"
  docker build -t $DEPLOY_PRODUCT_NAME $DEPLOY_PRODUCT_LOCATION/

  # Docker Build DEPLOY_SECURITY_NAME
  echo -e "\e[36m⚙ Begin build of ${DEPLOY_SECURITY_NAME} \e[39m"
  docker build -t $DEPLOY_SECURITY_NAME $DEPLOY_SECURITY_LOCATION/

  # KubeCtl create namespace
  echo -e "\e[36m⚙ Begin kubectl create namespace \e[39m"
  kubectl create namespace $K8S_NAMESPACE

  # KubeCtl delete all deploy
  echo -e "\e[36m⚙ Begin kubectl clean all deployments \e[39m"
  kubectl delete --all deployments --namespace=$K8S_NAMESPACE

  # KubeCtl delete all deploy
  echo -e "\e[36m⚙ Begin kubectl clean all pods \e[39m"
  kubectl delete --all pods --namespace=$K8S_NAMESPACE
 
  # KubeCtl delete all services
  echo -e "\e[36m⚙ Begin kubectl clean all services \e[39m"
  kubectl delete --all services --namespace=$K8S_NAMESPACE

  # KubeCtl create secret
  echo -e "\e[36m⚙ Begin kubectl create secrets \e[39m"
  kubectl create -f $SECRET_TOKEN_LOCATION --namespace=$K8S_NAMESPACE 

  # KubeCtl create all deploy
  echo -e "\e[36m⚙ Begin kubectm create all deploy \e[39m"
  sed "s/<VERSION>/$VERSION/" ../gateway-deploy.yaml > /tmp/gateway-deploy.yaml
  kubectl create -f /tmp/gateway-deploy.yaml --namespace=$K8S_NAMESPACE

  sed "s/<VERSION>/$VERSION/" ../product-jobloss-deploy.yaml > /tmp/product-jobloss-deploy.yaml
  kubectl create -f /tmp/product-jobloss-deploy.yaml --namespace=$K8S_NAMESPACE

  sed "s/<VERSION>/$VERSION/" ../security-deploy.yaml > /tmp/security-deploy.yaml
  kubectl create -f /tmp/security-deploy.yaml --namespace=$K8S_NAMESPACE

  # KubeCtl create all services
  echo -e "\e[36m⚙ Begin kubectm clean all services \e[39m"
  kubectl create -f ../gateway-svc.yaml --namespace=$K8S_NAMESPACE
  kubectl create -f ../product-jobloss-svc.yaml --namespace=$K8S_NAMESPACE
  kubectl create -f ../security-svc.yaml --namespace=$K8S_NAMESPACE

  echo -e "\e[32m✔ Successful deployment \e[39m"
else
  echo -e "\e[31m✘ Abort deployment \e[39m"
fi
