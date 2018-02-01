# Security

## gRPC interface

```
Connecting to authentication.Authentication on localhost:8083. Available globals:

  client - the client connection to Authentication
    password (PasswordRequest, callback) returns ResponseLL
    jwt (JwtRequest, callback) returns ResponseSL
    key (KeyRequest, callback) returns ResponseSL

  printReply - function to easily print a unary call reply (alias: pr)
  streamReply - function to easily print stream call replies (alias: sr)
  createMetadata - convert JS objects into grpc metadata instances (alias: cm)
```

## Testing tools

* grpcc(CLI tool) : https://github.com/njpatel/grpcc

## How to test

1. Launch client
``` 
grpcc -p authentication.proto -a localhost:8083 -i
```

2. Call methods:

* password
[IN]
``` 
client.password({ userName:'acy', password:'1234', type:'adminUser' }, printReply)
```
[OUT]
``` 
{
  "llToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzMxNDExNzk1MTEsInBlcm1pc3Npb25zIjpbXSwicGFydG5lcnMiOltdLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNTE3NTAyNzc5fQ.YB7YlW859Hin-cwKTHKfcaNjJFWBrCgj-lEuYxae6G_yiIcReB4E8BaokoR82lecWl1TwsGNMcosuvpP20Cx56X03iUJfcK8_6gmYQ0atlLgaC1yPw8vzHtRbhArzCR58BTubE0iEy3-H8vglUzUG2wxfEEXExSsoaBXHK-044fST4BabgpHV4BHYHuOSFV2jFYH9Y36mcJ-Tirx_tW5PcUiQFWnG2bBb1F2uO1nMjOL9_sjHr4FyYMTtU2ih2U40r8j9PH6sHlBgI4YR9bqilX8orBtMipmk7kuiuq6xkevo6m5TPmzF83ttA5Ibw-fth5NbkzgFmijkUHfOmZ7qA"
}
```

* jwt
[IN]
``` 
client.jwt({ jwt:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ', type:'adminUser' }, printReply)

```
[OUT]
``` 
{
  "slToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MTc1MDI5MDc0ODIsInBlcm1pc3Npb25zIjpbXSwicGFydG5lcnMiOltdLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNTE3NTAyOTA3fQ.PqyCWg7764yD2T8pUdrP4M9Kd_TvVWJfd7cICI4_JGpAadilzNq1W9xNtqXUwM5SqkVNMtqOgn7b5xq6MoXiXHlBubtUl7yUomLSrcpOcPBeXOwg_FnSYa1mjMzQrBc9PxE_NCE9RHvyFVqjO0HYd1zBy-XHZXDMSeEFmgxTNG1lfGcIgw-hK9upOsRPGNpxaQPdG6rrNJ35IgUdpkE5rTBgKVHYwCOJg90tTHR1hnfdWfdOiqUNPUh7k78iQYivlaWZXvLH8BpCQuHgzXKkH7-seHynKjdBC6adWVl6hzzFXuYvLp41TvbChx5Do-OEM-FO2r-tXGbMv2AnMaoZug"
}
```

* key
[IN]
``` 
client.key({ key:'m9Jaa91fes21MbwPSe3cshAcPQY62rta' }, printReply)

```
[OUT]
``` 
{
  "slToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MTc1MDMwMzIxNTAsInBlcm1pc3Npb25zIjpbXSwicGFydG5lcnMiOltdLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNTE3NTAzMDMyfQ.pG3GVMMfcEzV2tsai_gUmyY9MvweMRaM-M_SvoiWgqPrF5WvkYnZOZ1K3zhPull8OKM96ilGJRDikAVreuoO8NXbIgTUJehd7xHLam_3eb9A8SD4BTaQtJ0McPQx9czTF678Dt49SrPFQF63TEeeF70sv2jAuyInjCspwE2ye9XToaLj1eHMuCj_Pipsn6N-i0lVxyEjNfFPJWswTlw0L-lnPoPQ3g8AcBRAGpjnYCPiaHEkFEa4SzJHyhGu3-k5f__r9u64Q4MCJZxueHG5EXqhoeOPl_vSIl7EeclGF5IIHSXa8EsetJkPywlOTeTsr3h7c4LUKLHew0blnY-oAw"
}
```