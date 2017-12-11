const browserSync = require('browser-sync').create();
browserSync.watch('./**/*').on('change', browserSync.reload);
browserSync.init({
    'server': 'public',
    port: 1337
});