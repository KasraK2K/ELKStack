# ELK Stack
Elasticsearch, Logstash, Kibana
&nbsp;

## Docker
Go to `docker` folder and run this command:
```bash
mkdir -p backup/{elasticsearch,logstash,kibana}
sudo chown -R 1000:1000 backup/
docker compose -p ELKStack up -d
mkdir -p ./elasticsearch/config/certs
cd ./elasticsearch/config/certs
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout elasticsearch.key -out elasticsearch.crt -subj "/CN=elasticsearch"
```
&nbsp;

Then check is everything ok using these commands:
```bash
docker logs elasticsearch
docker logs logstash
docker logs kibana
```
&nbsp;

Check elasticsearch health:
```bash
curl http://localhost:9200/_cluster/health?pretty
```

Example response:
```bash
{
  "cluster_name" : "docker-cluster",
  "status" : "yellow",
  "timed_out" : false,
  "number_of_nodes" : 1,
  "number_of_data_nodes" : 1,
  "active_primary_shards" : 10,
  "active_shards" : 10,
  "relocating_shards" : 0,
  "initializing_shards" : 0,
  "unassigned_shards" : 1,
  "delayed_unassigned_shards" : 0,
  "number_of_pending_tasks" : 0,
  "number_of_in_flight_fetch" : 0,
  "task_max_waiting_in_queue_millis" : 0,
  "active_shards_percent_as_number" : 90.9090909090909
}
```
&nbsp;

Now kibana is accessible in [http://<host_ip>:5600](http://<host_ip>:5600)
&nbsp;

Get/Generate `Kibana token` need to know `Elasticsearch Container ID` so copy id of container appear with this command:
```bash
docker ps
```

Then put in this command and get token:
```bash
docker exec -it <elasticsearch-container-id> bin/elasticsearch-create-enrollment-token -s kibana
# or
docker exec -it elasticsearch bin/elasticsearch-create-enrollment-token -s kibana
```

Now copy generated token and paste to Kibana UI field and it want's generated code from kibana log so watch kibana log with this command:
```bash
docker logs kibana
```
&nbsp;

Now we can create user and password with one of these ways:

### Interactive
```bash
docker exec -it <elasticsearch-container-id> bin/elasticsearch-setup-passwords interactive
# or
docker exec -it elasticsearch bin/elasticsearch-setup-passwords interactive
```

### Auto
```bash
docker exec -it <elasticsearch-container-id> bin/elasticsearch-setup-passwords auto
# or
docker exec -it elasticsearch bin/elasticsearch-setup-passwords auto
```
&nbsp;

## Javascript

Go to `javascript` folder and run this:
```bash
npm start
```

Because of `indexPrefix` key in `logger.js` file now `my-node-app-logs` index pattern exist in kibana