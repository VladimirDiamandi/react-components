export class Utils {
  static createGuard<T>(checkedKey: string) {
    return function (value: T | any): value is T {
      if (!value) {
        return false;
      }
  
      //@ts-ignore
      const result = (value as T)[checkedKey];
  
      return !!result || result === 0;
    };
  }
}
