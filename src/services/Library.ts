export class Library<T extends { id: string }> {
    private items: T[] = [];

    add(item: T): void {
        this.items.push(item);
    }

    remove(id: string): boolean {
        const index: number = this.items.findIndex(
            (item: T) => item.id === id
        );

        if (index === -1) {
            return false;
        }

        this.items.splice(index, 1);
        return true;
    }

    find(id: string): T | undefined {
        return this.items.find((item: T) => item.id === id);
    }

    getAll(): T[] {
        return [...this.items];
    }

    get count(): number {
        return this.items.length;
    }
}