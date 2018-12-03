

const namaCache = 'pr-v1';
const filesToCache = [
		'.',
		'index.html',
		'style.css',
		'404.html',
		'project1/add2numbers.html',
		'project1/add2numbers.js'
	
	];

self.addEventListener('install', event => {
	console.log('Lagi Persiapan Cache');
	event.waitUntil(
		caches.open(namaCache)
			.then(cache => {
				return cache.addAll(filesToCache);
				})
			);
});

self.addEventListener('fetch', event => {
	event.respondWith(
		caches.match(event.request)
		.then( ada_response => {
		if (ada_response) {
			return ada_response;
		}
// no resp
		else {
			return fetch(event.request)
			}
		})
		.catch(error => {
	  		return new Response("Yang ini ga bisa, jadi" + error );
		})
	);
});

/*
const cacheName ='v1';

const cacheAssets = [
'index.html',
'style.css'
'project1/add2numbers.html',
'project1/add2numbers.js'
];

self.addEventListener('install', e => {
	console.log ("SW installed");

	e.waitUntil(
		caches
		.open(cacheName)
		.then(cache => {
			console.log("Lagi siap2");
			cache.addAll(cacheAssets);

		})

		.then(() => self.skipWaiting())
	);

});
*/