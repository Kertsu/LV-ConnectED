import { Server, init, postUpgrade, preUpgrade, setNodeServer } from "azle";
import { Database, DatabaseOptions } from "./database";
import { ENTITIES } from "./database/entities";
import { ConsoleLogger } from "./database/logger";
import { Seeder } from "./database/seeders/seeder";
import { DatabaseStorage } from "./database/storage";
import { CreateServer } from "./server";

const databaseOptions: DatabaseOptions = {
  synchronize: false,
  migrationsRun: true,
  storage: new DatabaseStorage({
    key: "DATABASE",
    index: 0,
  }),
  entities: ENTITIES,
  // TODO: Migrations are not found
  migrations: ["/migrations/*.{ts,js}"],
  // TODO: logger not working,
  logger: new ConsoleLogger(false),
};

let db: Database | undefined;

export default Server(
  async () => {
    db = new Database(databaseOptions);
    await db.load();
    return CreateServer();
  },
  {
    init: init([], async () => {
      try {
        db = new Database(databaseOptions);
        await db.init();
        const seeder = new Seeder(db);
        await seeder.seedStudents(100);
        await seeder.seedProviders(20);
        await seeder.seedPosts(20);
        await seeder.seedFeedbacks(80);
        await seeder.seedBookmarks(20);
        setNodeServer(CreateServer());
      } catch (error) {
        console.error("Error initializing database:", error);
        throw error;
      }
    }),
    preUpgrade: preUpgrade(() => {
      try {
        if (!db) {
          throw new Error("Database not initialized");
        }

        db.save();
      } catch (error) {
        console.error("Error saving database:", error);
      }
    }),
    postUpgrade: postUpgrade([], async () => {
      try {
        db = new Database(databaseOptions);
        await db.load();
        setNodeServer(CreateServer());
      } catch (error) {
        console.error("Error loading database:", error);
      }
    }),
  }
);
