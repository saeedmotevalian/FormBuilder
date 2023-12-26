export class LocalStorageUtil {

  public static saveString(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  public static saveInt(key: string, value: number): void {
    localStorage.setItem(key, '' + value);
  }

  public static saveBoolean(key: string, value: boolean): void {
    localStorage.setItem(key, '' + value);
  }

  public static saveObject(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public static loadString(key: string, defaultValue: string | null): string | null {
    return localStorage.getItem(key) == null ? defaultValue : localStorage.getItem(key);
  }

  public static loadInt(key: string, defaultValue: number): number | null {
    return localStorage.getItem(key) == null ? defaultValue : JSON.parse(<string>localStorage.getItem(key));
  }

  public static loadBoolean(key: string, defaultValue: boolean): boolean | null {
    return localStorage.getItem(key) == null ? defaultValue : JSON.parse(<string>localStorage.getItem(key));
  }

  public static loadObject(key: string, defaultValue: any): any | null {
    return localStorage.getItem(key) == null ? defaultValue : JSON.parse(<string>localStorage.getItem(key));
  }

  public static remove(key: string): void {
    return localStorage.removeItem(key);
  }

  public static clear(): void {
    localStorage.clear();
  }
}
