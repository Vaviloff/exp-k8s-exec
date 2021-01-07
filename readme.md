## Execute commands in pods and get result output in node.js

1. Have a cluster ([microk8s](https://microk8s.io/docs) is a nice super fast way to start locally)

2. Launch a minimum pod and connect to its shell:
```bash
kubectl run -i --tty busybox --image=busybox --restart=Never -- sh
```

3. Create a sample file inside of the pod:
```bash
mkdir /example && echo '{ "id": "junx8nvi8visygivlxvgilx" }' > /example/data.json
```