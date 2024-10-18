import { DataSource } from "typeorm";
import { Database } from "../index";
import { User } from "Database/entities/user";
import { userSeeds } from "./seed";

export class Seeder {
  private dataSource: DataSource;

  constructor(private db: Database) {}

  public async seedUsers() {
    try {
      this.dataSource = await this.db.getDataSource();
      const users = User.create(userSeeds(5, "student"));

      await this.dataSource.getRepository(User).save(users);

      console.log("Users seeded successfully!");
    } catch (err) {
      console.error("Error while seeding:", err);
      throw err;
    }
  }
}
