import Redis from "ioredis";
import {config} from "dotenv"
config();




const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,

});

redis.on("connect", () => {
  console.log("Successfully connected to Redis");
});

redis.on("error", () => {
    console.log("failed connected to Redis");
  });
export default redis;
