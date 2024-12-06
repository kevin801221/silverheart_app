// src/services/userSettings.ts
import { db } from '@/lib/db';

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
  updatedAt: Date;
}

export class UserSettingsService {
  private collection = db.getDb().collection<UserSettings>('user_settings');

  async saveSettings(userId: string, settings: Partial<UserSettings>): Promise<void> {
    try {
      const result = await this.collection.updateOne(
        { userId },
        { 
          $set: {
            ...settings,
            updatedAt: new Date()
          }
        },
        { upsert: true }
      );
      
      if (!result.acknowledged) {
        throw new Error('儲存設置失敗');
      }
    } catch (error) {
      console.error('儲存設置時發生錯誤:', error);
      throw new Error('儲存設置失敗');
    }
  }

  async getSettings(userId: string): Promise<UserSettings | null> {
    try {
      return await this.collection.findOne({ userId });
    } catch (error) {
      console.error('獲取設置時發生錯誤:', error);
      throw new Error('獲取設置失敗');
    }
  }
}

export const userSettingsService = new UserSettingsService();