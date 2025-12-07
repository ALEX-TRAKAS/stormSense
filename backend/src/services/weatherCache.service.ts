import { CacheService } from "./cache.service";

export class WeatherCache {
  static key(location: string) {
    return `weather:${location}`;
  }

  static get(location: string) {
    return CacheService.get(this.key(location));
  }

  static set(location: string, data: any) {
    return CacheService.set(this.key(location), data, 3600);
  }
}
