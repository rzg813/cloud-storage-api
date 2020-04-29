function copyProperties(
  dest: Record<string, any>,
  orig: Record<string, any>,
): Record<string, any> {
  const keysTo = Object.keys(dest);
  for (const key of keysTo) {
    if (orig[key] !== undefined) {
      dest[key] = orig[key];
    }
  }
  return dest;
}
module.exports = copyProperties;
