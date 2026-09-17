export namespace Validation {
    export function isRequired(value: string): boolean {
        return value.trim().length > 0;
    }

    export function isUserIdValid(id: string): boolean {
        return /^\d+$/.test(id);
    }

    export function isPublicationYearValid(year: string): boolean {
        return /^\d{4}$/.test(year);
    }

    export function isNameValid(name: string): boolean {
        return /^[A-Za-zА-Яа-яІіЇїЄєҐґ.\s-]+$/.test(name.trim());
    }
}
