/**
 * SoundCloud Auto Crossfader - Background Service Worker
 * Tiếp nhận Live Client ID từ inject.js, giải mã stream URL tức thời
 */

console.log('[SC-Crossfader] Service Worker v4.0 sẵn sàng.');

let liveClientId = null;
const streamCache = new Map();

// Các Client ID dự phòng
const FALLBACK_CLIENT_IDS = [
  'iZIs9mchVcX5lhVR1HNjwtb1nfq09BQ1',
  'b426b38c957b6971e45f944d00718880',
  '2t9loNfh0ekOfHG3lJLUpNu4bg84fqeO'
];

/**
 * Resolve track URL sang stream URL
 */
async function resolveTrackStream(rawUrl, providedClientId) {
  const cleanPath = rawUrl.startsWith('http') ? rawUrl : `https://soundcloud.com${rawUrl.startsWith('/') ? '' : '/'}${rawUrl}`;

  if (streamCache.has(cleanPath)) {
    const cached = streamCache.get(cleanPath);
    if (Date.now() - cached.time < 5 * 60 * 1000) {
      return cached.data;
    }
  }

  const clientId = providedClientId || liveClientId || FALLBACK_CLIENT_IDS[0];
  console.log('[SC-Crossfader:BG] Đang resolve track:', cleanPath, 'với clientId:', clientId);

  const resolveApi = `https://api-v2.soundcloud.com/resolve?url=${encodeURIComponent(cleanPath)}&client_id=${clientId}`;
  const resolveResp = await fetch(resolveApi);
  if (!resolveResp.ok) {
    throw new Error(`SoundCloud API Resolve thất bại (Mã ${resolveResp.status})`);
  }

  const data = await resolveResp.json();
  const track = data.kind === 'playlist' && data.tracks?.length ? data.tracks[0] : data;

  const transcodings = track.media?.transcodings;
  if (!transcodings || !transcodings.length) {
    throw new Error('Không tìm thấy luồng âm thanh transcoding cho bài hát.');
  }

  // Ưu tiên Progressive MP3, fallback HLS AAC
  const chosen = transcodings.find(t => t.format?.protocol === 'progressive') ||
                 transcodings.find(t => t.format?.protocol === 'hls') ||
                 transcodings[0];

  const sep = chosen.url.includes('?') ? '&' : '?';
  const cdnResp = await fetch(`${chosen.url}${sep}client_id=${clientId}`);
  if (!cdnResp.ok) {
    throw new Error(`Không lấy được link stream CDN (Mã ${cdnResp.status})`);
  }

  const cdnData = await cdnResp.json();
  const result = {
    streamUrl: cdnData.url,
    protocol: chosen.format?.protocol || 'hls',
    title: track.title || 'Bài tiếp theo',
    duration: Math.round((track.duration || 0) / 1000), // Quy đổi sang giây
    permalink: track.permalink_url || cleanPath,
    artwork: track.artwork_url || track.user?.avatar_url || ''
  };

  streamCache.set(cleanPath, { time: Date.now(), data: result });
  return result;
}

// Lắng nghe messages
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'SET_LIVE_CLIENT_ID') {
    liveClientId = msg.clientId;
    console.log('[SC-Crossfader:BG] Đã lưu Live Client ID:', liveClientId);
    sendResponse({ success: true });
    return true;
  }

  if (msg.type === 'RESOLVE_STREAM_URL') {
    resolveTrackStream(msg.trackUrl, msg.clientId)
      .then(res => sendResponse({ success: true, ...res }))
      .catch(err => {
        console.error('[SC-Crossfader:BG] Resolve error:', err);
        sendResponse({ success: false, error: err.message });
      });
    return true; // async
  }
});
