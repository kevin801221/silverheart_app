// src/services/userService.ts
import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = "mongodb+srv://kevinluo1221:<db_password>@cluster0.alpag.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

export interface UserSettings {
  userId: string;
  name: string;
  phone: string;
  notificationSettings: {
    appNotifications: boolean;
    smsNotifications: boolean;
  };
  securitySettings: {
    biometricLogin: boolean;
  };
}

class UserService {
  private client: MongoClient;

  constructor() {
    this.client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
  }

  async updateUserSettings(userId: string, settings: Partial<UserSettings>): Promise<void> {
    try {
      await this.client.connect();
      const database = this.client.db("silverheart");
      const collection = database.collection("user_settings");
      
      await collection.updateOne(
        { userId },
        { 
          $set: {
            ...settings,
            updatedAt: new Date()
          }
        },
        { upsert: true }
      );
    } catch (error) {
      console.error("Error updating user settings:", error);
      throw error;
    } finally {
      await this.client.close();
    }
  }

  async getUserSettings(userId: string): Promise<UserSettings | null> {
    try {
      await this.client.connect();
      const database = this.client.db("silverheart");
      const collection = database.collection("user_settings");
      
      const settings = await collection.findOne<UserSettings>({ userId });
      return settings;
    } catch (error) {
      console.error("Error getting user settings:", error);
      throw error;
    } finally {
      await this.client.close();
    }
  }
}

export const userService = new UserService();