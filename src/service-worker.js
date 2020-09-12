// https://juejin.im/post/6844903971065167885

workbox.core.setCacheNameDetails({
    prefix: 'sw-cb841c335ac8be9a',
    suffix: 'v1.0.0'
});

// 强制等待中的 Service Worker 被激活
workbox.core.skipWaiting();

// Service Worker 被激活后使其立即获得页面控制权
workbox.core.clientsClaim();

workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

// 缓存web的css资源
workbox.routing.registerRoute(
    // Cache CSS files
    /.*\.css/,
    // 使用缓存，但尽快在后台更新
    workbox.strategies.staleWhileRevalidate({
        // 使用自定义缓存名称
        cacheName: 'css-cache'
    })
);

// 缓存web的js资源
workbox.routing.registerRoute(
    // 缓存JS文件
    /.*\.js/,
    // 使用缓存，但尽快在后台更新
    workbox.strategies.staleWhileRevalidate({
        // 使用自定义缓存名称
        cacheName: 'js-cache'
    })
);

// 缓存web的图片资源
workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'web-images-cache',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60 // 设置缓存有效期为30天
            })
        ]
    })
);

// 我们很多资源在其他域名上，比如cdn、oss等，这里做单独处理，需要支持跨域
workbox.routing.registerRoute(
    /^https:\/\/api\.91m\.top\/.*\.(jpe?g|png|gif|svg)/,
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'cdn-images-cache',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 60,
                maxAgeSeconds: 60 * 60 * 24 * 7 // 设置缓存有效期为 7 天
            })
        ],
        fetchOptions: {
            credentials: 'include' // 支持跨域
        }
    })
);

// 缓存get api请求的数据
workbox.routing.registerRoute(
    new RegExp('https://api.91m.top'),
    workbox.strategies.networkFirst({
        cacheName: 'get-api-cache'
    })
);

// 缓存post api请求的数据
const bgSyncPlugin = new workbox.backgroundSync.Plugin('apiQueue', {
    maxRetentionTime: 60 * 1
});

workbox.routing.registerRoute(
    new RegExp('https://api.91m.top'),
    new workbox.strategies.NetworkOnly({
        plugins: [bgSyncPlugin]
    }),
    'POST'
);