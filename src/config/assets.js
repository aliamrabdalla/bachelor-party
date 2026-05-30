// Resolve a file in public/2d-assets/ to a URL that works in dev (base "/")
// and on GitHub Pages (base "/bachelor-party/"). Always use this for assets.
export const asset = (name) => `${import.meta.env.BASE_URL}2d-assets/${name}`;
