#!/bin/bash

for i in {1..300..1}
do
  curl -XPOST -H "Content-type: application/json" -d '{   
    "type": "single",
    "body": "second notification",
    "title": "notification title",
    "delivery_method": "push",
    "priority": 2,
    "recipients": ["user1_id"]
}' 'http://localhost:3003/notifications'
done  