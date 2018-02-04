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
fly -t main set-pipeline --config gateway.yml --pipeline gateway-pipeline --load-vars-from credentials.yaml
```