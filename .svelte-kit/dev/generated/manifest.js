const c = [
	() => import("../../../src/routes/__layout.svelte"),
	() => import("../components/error.svelte"),
	() => import("../../../src/routes/index.svelte"),
	() => import("../../../src/routes/explore/index.svelte"),
	() => import("../../../src/routes/explore/[band]/__layout.svelte"),
	() => import("../../../src/routes/explore/[band]/index.svelte"),
	() => import("../../../src/routes/explore/[band]/albums/index.svelte"),
	() => import("../../../src/routes/explore/[band]/shows/index.svelte"),
	() => import("../../../src/routes/todos/index.svelte"),
	() => import("../../../src/routes/auth.svelte"),
	() => import("../../../src/routes/[user]/index.svelte")
];

const d = decodeURIComponent;

export const routes = [
	// src/routes/index.svelte
	[/^\/$/, [c[0], c[2]], [c[1]]],

	// src/routes/explore/index.json.js
	[/^\/explore\.json$/],

	// src/routes/explore/index.svelte
	[/^\/explore\/?$/, [c[0], c[3]], [c[1]]],

	// src/routes/explore/[band]/index.json.js
	[/^\/explore\/([^/]+?)\.json$/],

	// src/routes/explore/[band]/index.svelte
	[/^\/explore\/([^/]+?)\/?$/, [c[0], c[4], c[5]], [c[1]], (m) => ({ band: d(m[1])})],

	// src/routes/explore/[band]/albums/index.json.js
	[/^\/explore\/([^/]+?)\/albums\.json$/],

	// src/routes/explore/[band]/albums/index.svelte
	[/^\/explore\/([^/]+?)\/albums\/?$/, [c[0], c[4], c[6]], [c[1]], (m) => ({ band: d(m[1])})],

	// src/routes/explore/[band]/shows/index.json.js
	[/^\/explore\/([^/]+?)\/shows\.json$/],

	// src/routes/explore/[band]/shows/index.svelte
	[/^\/explore\/([^/]+?)\/shows\/?$/, [c[0], c[4], c[7]], [c[1]], (m) => ({ band: d(m[1])})],

	// src/routes/todos/index.json.js
	[/^\/todos\.json$/],

	// src/routes/todos/index.svelte
	[/^\/todos\/?$/, [c[0], c[8]], [c[1]]],

	// src/routes/todos/[uid].json.js
	[/^\/todos\/([^/]+?)\.json$/],

	// src/routes/auth.svelte
	[/^\/auth\/?$/, [c[0], c[9]], [c[1]]],

	// src/routes/api/batch/data.js
	[/^\/api\/batch\/data\/?$/],

	// src/routes/api/auth/logout.js
	[/^\/api\/auth\/logout\/?$/],

	// src/routes/api/auth/login.js
	[/^\/api\/auth\/login\/?$/],

	// src/routes/api/auth/user.js
	[/^\/api\/auth\/user\/?$/],

	// src/routes/[user]/index.json.js
	[/^\/([^/]+?)\.json$/],

	// src/routes/[user]/index.svelte
	[/^\/([^/]+?)\/?$/, [c[0], c[10]], [c[1]], (m) => ({ user: d(m[1])})]
];

// we import the root layout/error components eagerly, so that
// connectivity errors after initialisation don't nuke the app
export const fallback = [c[0](), c[1]()];