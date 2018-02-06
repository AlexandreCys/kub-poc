# Fly

## Login

```
fly -t main login -c http://127.0.0.1:8080/
  username : concourse
  password : changme
```

## Configure

## Config
```
kubectl config view
```

### Ngrock
```
ngrok http 192.168.99.100:8443
```

### Pipeline
```
fly -t main set-pipeline --config gateway.yaml --pipeline gateway-pipeline --load-vars-from credentials.yaml
fly -t main set-pipeline --config security.yaml --pipeline security-pipeline --load-vars-from credentials.yaml
fly -t main set-pipeline --config jobloss.yaml --pipeline jobloss-pipeline --load-vars-from credentials.yaml

```