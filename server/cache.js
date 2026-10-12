/**
 * In-memory TTL Cache Singleton
 */
class MemoryCache {
  constructor() {
    this.store = new Map();
  }

  /**
   * Retrieve cached value or null if expired / missing
   * @param {string} key
   * @returns {any|null}
   */
  get(key) {
    const item = this.store.get(key);
    if (!item) {
      return null;
    }

    if (Date.now() > item.expiresAt) {
      this.store.delete(key);
      return null;
    }

    return item.value;
  }

  /**
   * Set cache entry with a TTL in milliseconds
   * @param {string} key
   * @param {any} value
   * @param {number} ttlMs
   */
  set(key, value, ttlMs = 60000) {
    this.store.set(key, {
      value,
      expiresAt: Date.now() + ttlMs,
    });
  }

  /**
   * Clear all entries or expired entries
   */
  clear() {
    this.store.clear();
  }

  /**
   * Delete specific key
   * @param {string} key
   */
  delete(key) {
    this.store.delete(key);
  }

  /**
   * Clean expired entries
   */
  purgeExpired() {
    const now = Date.now();
    for (const [key, item] of this.store.entries()) {
      if (now > item.expiresAt) {
        this.store.delete(key);
      }
    }
  }
}

// Export singleton instance
const cache = new MemoryCache();
module.exports = cache;
