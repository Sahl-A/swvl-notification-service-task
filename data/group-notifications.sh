#!/bin/bash

curl -XPOST -H "Content-type: application/json" -d '{   
    "type": "group",
    "body": "notification body 1",
    "title": "notification title 1",
    "delivery_method": "push",
    "priority": 1,
    "recipients": ["user1_id", "user2_id"]
}' 'http://localhost:3003/notifications'

curl -XPOST -H "Content-type: application/json" -d '{   
    "type": "group",
    "body": "notification body 2",
    "title": "notification title 2",
    "delivery_method": "push",
    "priority": 2,
    "recipients": ["user1_id", "user2_id"]
}' 'http://localhost:3003/notifications'

curl -XPOST -H "Content-type: application/json" -d '{   
    "type": "group",
    "body": "notification body 3",
    "title": "notification title 3",
    "delivery_method": "push",
    "priority": 3,
    "recipients": ["user1_id", "user2_id"]
}' 'http://localhost:3003/notifications'

curl -XPOST -H "Content-type: application/json" -d '{   
    "type": "single",
    "body": "notification body 4",
    "title": "notification title 4",
    "delivery_method": "push",
    "priority": 1,
    "recipients": ["user1_id"]
}' 'http://localhost:3003/notifications'

curl -XPOST -H "Content-type: application/json" -d '{   
    "type": "single",
    "body": "notification body 5",
    "title": "notification title 5",
    "delivery_method": "push",
    "priority": 1,
    "recipients": ["user1_id"]
}' 'http://localhost:3003/notifications'

curl -XPOST -H "Content-type: application/json" -d '{   
    "type": "single",
    "body": "notification body 6",
    "title": "notification title 6",
    "delivery_method": "sms",
    "priority": 4,
    "recipients": ["user1_id"]
}' 'http://localhost:3003/notifications'

curl -XPOST -H "Content-type: application/json" -d '{   
    "type": "single",
    "body": "notification body 7",
    "title": "notification title 7",
    "delivery_method": "sms",
    "priority": 5,
    "recipients": ["user1_id"]
}' 'http://localhost:3003/notifications'

curl -XPOST -H "Content-type: application/json" -d '{   
    "type": "single",
    "body": "notification body 8",
    "title": "notification title 8",
    "delivery_method": "sms",
    "priority": 4,
    "recipients": ["user1_id"]
}' 'http://localhost:3003/notifications'

curl -XPOST -H "Content-type: application/json" -d '{   
    "type": "group",
    "body": "notification body 9",
    "title": "notification title 9",
    "delivery_method": "sms",
    "priority": 5,
    "recipients": ["user1_id", "user2_id"]
}' 'http://localhost:3003/notifications'

curl -XPOST -H "Content-type: application/json" -d '{   
    "type": "group",
    "body": "notification body 10",
    "title": "notification title 10",
    "delivery_method": "sms",
    "priority": 5,
    "recipients": ["user133_id", "user234_id"]
}' 'http://localhost:3003/notifications'