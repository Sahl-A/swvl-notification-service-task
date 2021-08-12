#!/bin/bash

curl -XPOST -H "Content-type: application/json" -d '{   
    "type": "group",
    "body": "second notification",
    "title": "notification title",
    "delivery_method": "sms",
    "priority": 1,
    "recipients": ["user1_id", "user2_id"]
}' 'http://localhost:3003/notifications'