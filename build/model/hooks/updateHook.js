"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateHook = void 0;
function updateHook() {
    if (!this.createdAt) {
        this.createdAt = Date.now();
    }
    this.updatedAt = Date.now();
}
exports.updateHook = updateHook;
