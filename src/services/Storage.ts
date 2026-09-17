export class StorageService {
    private readonly prefix: string = "library-management";

    save<T>(key: string, data: T[]): void {
        const storageKey: string = `${this.prefix}-${key}`;

        localStorage.setItem(storageKey, JSON.stringify(data));
    }

    load<T>(key: string): T[] {
        const storageKey: string = `${this.prefix}-${key}`;
        const data: string | null = localStorage.getItem(storageKey);

        if (data === null) {
            return [];
        }

        return JSON.parse(data) as T[];
    }

    remove(key: string): void {
        const storageKey: string = `${this.prefix}-${key}`;

        localStorage.removeItem(storageKey);
    }

    clear(): void {
        localStorage.removeItem(`${this.prefix}-books`);
        localStorage.removeItem(`${this.prefix}-users`);
    }
}
