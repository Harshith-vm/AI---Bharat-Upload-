export function safeArray<T>(arr: T[] | undefined | null): T[] {
    if (!Array.isArray(arr)) return [];
    return arr;
}

export function hasData(arr: any[] | undefined | null): boolean {
    return Array.isArray(arr) && arr.length > 0;
}