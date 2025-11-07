// Simple in-memory cache using a Map
const cache = new Map();
const TTL = 30 * 1000; // 30 seconds

export function cacheMiddleware(req, res, next) {
  const key = req.originalUrl;
  const cachedData = cache.get(key);

  if (cachedData && Date.now() - cachedData.timestamp < TTL) {
    console.log("✅ Cache hit:", key);
    return res.json(cachedData.data);
  }

  console.log("❌ Cache miss:", key);

  // Replace res.json to capture the data before sending
  const originalJson = res.json.bind(res);
  res.json = (data) => {
    cache.set(key, { data, timestamp: Date.now() });
    return originalJson(data);
  };

  next();
}
