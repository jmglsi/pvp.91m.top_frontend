//https://juejin.im/post/6844903971065167885

workbox.core.setCacheNameDetails({
    prefix: 'sw-dcdf3cc403dee57e',
    suffix: 'v1.0.0'
});

//缓存web的css资源
workbox.routing.registerRoute(
    /.*\.css/,
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'css-cache'
    })
);

//缓存web的js资源
workbox.routing.registerRoute(
    /.*\.js/,
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'js-cache'
    })
);

//缓存web的图片资源,设置缓存有效期为30天
workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'web-images-cache',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60
            })
        ]
    })
);

//我们很多资源在其它域名上,比如cdn、oss等,这里做单独处理,需要支持跨域,设置缓存有效期为 7 天
workbox.routing.registerRoute(
    /^https:\/\/game\.gtimg\.cn\/.*\.(jpe?g|png|gif|svg)/,
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'cdn-images-cache',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 60,
                maxAgeSeconds: 60 * 60 * 24 * 7
            })
        ],
        fetchOptions: {
            credentials: 'include'
        }
    })
);

//缓存 GET 请求的数据
workbox.routing.registerRoute(
    new RegExp('https://api.91m.top'),
    workbox.strategies.networkFirst({
        cacheName: 'get-api-cache'
    })
);

//缓存 POST 请求的数据
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

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});