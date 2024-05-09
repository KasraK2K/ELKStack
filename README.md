# ELK Stack
Elasticsearch, Logstash, Kibana
&nbsp;

## Docker
go to `docker` folder and run this command:
```bash
docker compose up -d
```
&nbsp;

Then check is everything ok using these commands:
```bash
docker logs elasticsearch
docker logs logstash
docker logs kibana
```

Check elasticsearch health:
```bash
curl http://localhost:9200/_cluster/health?pretty
```
&nbsp;

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

## Javascript

Go to `javascript` folder and run this:
```bash
npm start
```

Because of `indexPrefix` key in `logger.js` file now `my-node-app-logs` index pattern exist in kibana