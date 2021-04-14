importScripts("precache-manifest.e2a94447a3f4c4593fa9e478a6224ed0.js", "workbox-v4.3.1/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v4.3.1"});
// importScripts('https://www.yuheyulei.com/third_party/workbox/workbox-v6.1.2/workbox-sw.js')
// workbox.setConfig({
//   modulePathPrefix: 'https://www.yuheyulei.com/third_party/workbox/workbox-v6.1.2/'
// })
if (workbox) {
  console.log(`Yay! Workbox is loaded!`);
} else {
  console.log(`Boo! Workbox didn't load!`);
}


// 设置缓存前缀和后缀，请根据实际项目名修改
workbox.core.setCacheNameDetails({
  prefix: 'yuheyulei-epms',
  suffix: 'v2.0.3'
});


// have our sw update and control a web page as soon as possible.
workbox.core.skipWaiting(); // 强制等待中的 Service Worker 被激活
workbox.core.clientsClaim(); // Service Worker 被激活后使其立即获得页面控制权


// vue-cli3.0通过workbox-webpack-plagin 来实现相关功能，我们需要加入 以下语句来获取预缓存列表和预缓存他们，也就是打包项目后生产的html，js，css等 静态文件
// vue-cli3.0 supports pwa with the help of workbox-webpack-plugin, we need to get the precacheing list through this sentence.
// 此项注释则为非全部缓存 后续资源类匹配项执行
workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

// 类型
// workbox.strategies.networkFirst() // 网络优先策略，优先尝试通过网络请求来获取数据，拿到数据后将数据返回给用户，并更新缓存，获取数据失败就使用缓存中的数据
// workbox.strategies.cacheFirst() // 优先获取缓存中的资源，如果缓存中没有相关资源，那么就发起网络请求。
// workbox.strategies.networkOnly() // 只使用网络请求获取的资源
// workbox.strategies.cacheOnly() // 只使用缓存中的资源
// workbox.strategies.stateWhileRevalidate() //此策略会直接返回缓存中的资源，确保获取资源的速度，然后再发起网络请求获取数据去更新缓存中的资源。如果缓存中没有对应资源的话就会发起网络请求，并缓存资源。


// workbox.routing.registerRoute(
//     // Cache CSS files
//     /.*\.css/,
//     // 使用缓存，但尽快在后台更新
//     workbox.strategies.networkFirst({
//       // 使用自定义缓存名称
//       cacheName: 'css-cache'
//     })
// );
// workbox.routing.registerRoute(
//     // 缓存JS文件
//     /.*\.js/,
//     // 使用缓存，但尽快在后台更新
//     workbox.strategies.networkFirst({
//       // 使用自定义缓存名称
//       cacheName: 'js-cache'
//     })
// );
workbox.routing.registerRoute(
    // 缓存JS文件
    /.*\.html/,
    // 使用缓存，但尽快在后台更新
    workbox.strategies.networkFirst({
      // 使用自定义缓存名称
      cacheName: 'html-cache'
    })
);

// workbox.routing.registerRoute(
//     /\.(?:png|gif|jpg|jpeg|svg|mp3)$/,
//     workbox.strategies.cacheFirst({
//       cacheName: 'sources-cache',
//       plugins: [
//         new workbox.expiration.Plugin({
//           maxEntries: 60,
//           maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
//         })
//       ]
//     })
// );

// 获取cdn上的资源，支持跨域，按自己的域名规则进行配置
// workbox.routing.registerRoute(
//     /^https:\/\/newmobileapptest\.cgnpc\.com\.cn\/img\/.*\.(jpe?g|png|gif|svg)/,
//     workbox.strategies.staleWhileRevalidate({
//       cacheName: 'cdn-images',
//       plugins: [
//         new workbox.expiration.Plugin({
//           maxEntries: 60,
//           maxAgeSeconds: 5 * 24 * 60 * 60 // 5 Days
//         })
//       ],
//       fetchOptions: {
//         credentials: 'include'
//       }
//     })
// );


// //缓存主站路由，按自己域名规则进行配置
// workbox.routing.registerRoute(
//     // Vue
//     new RegExp('https://newmobileapptest.cgnpc.com.cn'),
//     // 使用缓存，但尽快在后台更新
//     workbox.strategies.staleWhileRevalidate()
// );
//
//
// // api缓存，优选从网络获取，网络异常时再使用缓存，请根据实际api url配置RegExp，只支持get请求
// workbox.routing.registerRoute(
//     new RegExp('https://newmobileapptest.cgnpc.com.cn'),
//     workbox.strategies.staleWhileRevalidate({
//       plugins: [
//         new workbox.cacheableResponse.Plugin({
//           statuses: [0, 200]
//         })
//       ]
//     })
// );


// // api缓存，优选从网络获取，网络异常时再使用缓存，请根据实际api url配置RegExp，支持post请求
// const bgSyncPlugin = new workbox.backgroundSync.Plugin('apiQueue', {
//   maxRetentionTime: 1 * 60
// });
//
// workbox.routing.registerRoute(
//   /.*\/apphost\/.*/,
//   new workbox.strategies.networkFirst({
//     plugins: [bgSyncPlugin]
//   }),
//   'POST'
// );


