function formatSize(size) {
  if (size < 1000) return `${size} bytes`;
  if (size >= 1000 && size < 1000000) return `${(size / 1000).toFixed(2)} KB`;
  if (size >= 1000000) return `${(size / 1000000).toFixed(2)} MB`;
}

export { formatSize };
