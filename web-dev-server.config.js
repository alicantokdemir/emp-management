module.exports = {
  rootDir: '.',
  nodeResolve: true,
  appIndex: 'index.html', // Main entry point
  watch: true,
  open: true,
  plugins: [],
  middleware: [
    function staticFileMiddleware(ctx, next) {
      if (ctx.url.startsWith('/images/')) {
        ctx.url = `/public${ctx.url}`; // Map `/images/` to `/public/images/`
      }
      return next();
    },
  ],
};
