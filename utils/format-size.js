function formatSize(size) {
  if (size < 1000) return `${size} bytes`
  if (size >= 1000) return `${size / 1000} kb`
}

export { formatSize };
