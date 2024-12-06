// src/lib/db.ts
import { MongoClient, ServerApiVersion } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env file');
}

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME || 'silverheart';

class Database {
  private static instance: Database;
  private client: MongoClient;
  private connected: boolean = false;
  
  private constructor() {
    this.client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  async connect() {
    if (!this.connected) {
      try {
        await this.client.connect();
        await this.client.db("admin").command({ ping: 1 });
        this.connected = true;
        console.log("成功連接到 MongoDB Atlas!");
      } catch (error) {
        console.error("MongoDB 連接失敗:", error);
        throw error;
      }
    }
  }

  getDb() {
    if (!this.connected) {
      throw new Error("Database not connected. Call connect() first.");
    }
    return this.client.db(dbName);
  }

  async disconnect() {
    if (this.connected) {
      await this.client.close();
      this.connected = false;
      console.log("已斷開 MongoDB 連接");
    }
  }
}

// 創建並導出資料庫實例
export const db = Database.getInstance();

// 處理應用程式關閉時的清理工作
process.on('SIGINT', async () => {
  await db.disconnect();
  process.exit(0);
});