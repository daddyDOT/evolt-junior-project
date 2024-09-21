const express = require('express');
const Message = require('../models/messageModel');
const NodeCache = require( "node-cache" );

const router = express.Router();

const myCache = new NodeCache();

async function countLiveData(query = {}) {
  try {
    const count = await Message.countDocuments(query);
    return count;
  } catch (error) {
    console.error('Error counting documents:', error);
  }
}

router.get('/', async (req, res) => {

    const cacheData = myCache.get("messages");
    if(cacheData){
      console.log("(backend) Data fetched from cache");

      const liveData = await countLiveData();

      if (liveData > cacheData.length){
        console.log("Data is outdated, fetching missing data...");

        try {
          const messages = (await Message.find().skip(cacheData.length)).reverse();
          
          myCache.del("messages");
          const success = myCache.mset([
            {key: "messages", val: [...messages, ...cacheData]},
          ]);
    
          console.log("(backend) Data cached with new messages: ", success);
          return res.json([...messages, ...cacheData ]);

        } catch (error) {
          res.status(500).json({ error: 'Error fetching messages' });
        }
      }

      return res.json(cacheData);
    }

    try {
      const messages = await Message.find().sort({ createdAt: -1 });

      const success = myCache.mset([
        {key: "messages", val: messages},
      ]);

      console.log("(backend) Data cached: ", success);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching messages' });
    }
});

module.exports = router;