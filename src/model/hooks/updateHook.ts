export function updateHook(this: any) {
    if (!this.createdAt) {
        this.createdAt = Date.now();
    }
    this.updatedAt = Date.now();
}