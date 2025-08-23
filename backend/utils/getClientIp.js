const getClientIp = (req) => {
  // Check for various headers that may contain the real IP
  const forwardedFor = req.headers['x-forwarded-for'];
  const realIp = req.headers['x-real-ip'];
  const cfConnectingIp = req.headers['cf-connecting-ip']; // Cloudflare
  const trueClientIp = req.headers['true-client-ip']; // Cloudflare Enterprise
  const clientIp = req.headers['x-client-ip'];
  
  // Priority order for IP detection
  if (cfConnectingIp) {
    return cfConnectingIp;
  }
  
  if (trueClientIp) {
    return trueClientIp;
  }
  
  if (forwardedFor) {
    // x-forwarded-for may contain multiple IPs, take the first one
    return forwardedFor.split(',')[0].trim();
  }
  
  if (realIp) {
    return realIp;
  }
  
  if (clientIp) {
    return clientIp;
  }
  
  // Socket remoteAddress as fallback
  if (req.socket && req.socket.remoteAddress) {
    // Remove IPv6 prefix if present
    const ip = req.socket.remoteAddress;
    if (ip.includes('::ffff:')) {
      return ip.substring(7);
    }
    return ip;
  }
  
  // Connection remoteAddress as last resort
  if (req.connection && req.connection.remoteAddress) {
    const ip = req.connection.remoteAddress;
    if (ip.includes('::ffff:')) {
      return ip.substring(7);
    }
    return ip;
  }
  
  // Return IP from req.ip as final fallback
  if (req.ip) {
    if (req.ip.includes('::ffff:')) {
      return req.ip.substring(7);
    }
    return req.ip;
  }
  
  return 'unknown';
};

module.exports = getClientIp;