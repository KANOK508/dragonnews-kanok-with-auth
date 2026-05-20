import dns from "node:dns";
dns.setServers(["8.8.8.8"]); //  set googel server forcefully.. 
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGO_URI);
//--  the step of getting the connection string --we go to the mongodb atlas account..  go to the cluster section --and we create a cluster..  and then we go to the cluster and click on connect..  and then we click on connect your application..  and then we copy the connection string..  and then we paste this connection string in our .env file..  and we give the name of the variable like MONGO_URI..  and then we use this variable here with process.env.MONGO_URI..
// --            inside the MongoClint we have to --- give a  connection string..  and we will get this connection string from our mongodb atlas account..  and we have to put this connection string in ---- > our .env file..  and we have to give the name of the variable like MONGO_URI..  and we have to use this variable here with process.env.MONGO_URI.. 
// and we have to make sure that we have added this variable in our next.config.js file..  otherwise, we won't be able to access this variable in our code..    

const db = client.db("dragon-news");


export const auth = betterAuth({
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client,
  }),

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
  },
});
