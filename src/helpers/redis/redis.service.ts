import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import { Redis } from 'ioredis';
import configs from 'src/configs';

@Injectable()
export class RedisService {
  private readonly redis: Redis;
  constructor() {
    this.redis = new Redis({
      host: configs.redis.host,
      port: configs.redis.port,
      password: configs.redis.secret,
    });
  }

  async getJSON<T>(key: string): Promise<T> {
    const result = await new Promise((resolve, reject) => {
      this.redis.hmget(key, 'data', (err, _res) => {
        if (err) {
          reject(err);
        }
        const [res] = _res;
        if (!res) {
          resolve(null);
        }
        try {
          resolve(JSON.parse(res));
        } catch (error) {
          reject(error);
        }
      });
    });

    return result as T;
  }

  /**
   *
   * @param key redis key
   * @param data any data to save in redis
   * @param expire in second
   */
  async setJSON(key: string, data: any, expire: number): Promise<void> {
    const json = JSON.stringify(data);
    await new Promise((resolve, reject) => {
      this.redis.hmset(key, { data: json }, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });

    await this.setExpire(key, expire);
  }

  /**
   *
   * @param key redis key
   * @param expire in second
   */
  async setExpire(key: string, expire: number): Promise<void> {
    if (expire === 0) {
      throw 'expire is zero';
    }
    await new Promise((resolve, reject) => {
      this.redis.expire(key, expire, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  }
}
