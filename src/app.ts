import { envs } from "./config/env.adapter";
import { MongoDatabase } from "./data";
import { Server } from "./presentation";
import { AppRoutes } from "./presentation/routes";


(async()=>{
    main();
})();


async function main(){
    
    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME,
        
      });
    const server = new Server({
        port: envs.PORT,
        routes: AppRoutes.routes
    });

    server.start();

}