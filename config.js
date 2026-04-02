const 
  defineConfig = require('vite').defineConfig;
  resolve = require('path').resolve,
  viteSingleFile = require('vite-plugin-singlefile').viteSingleFile,
  handlebars = require('vite-plugin-handlebars'),
  helpers = require('handlebars-helpers')();

module.exports = (resumeOrGetter) => {
  const getResume =
    typeof resumeOrGetter === 'function' ? resumeOrGetter : () => resumeOrGetter;
  const lang = process.env.RESUME_VARIANT || 'en';
  const { translations } = require('./src/translations');

  return defineConfig({
    plugins: [
      {
        name: 'watch-resume-json',
        configureServer(server) {
          const resumeFiles = [
            resolve(__dirname, 'resume.json'),
            resolve(__dirname, 'resume-no.json'),
          ];
          for (const f of resumeFiles) {
            server.watcher.add(f);
          }
          server.watcher.on('change', (path) => {
            if (path.endsWith('resume.json') || path.endsWith('resume-no.json')) {
              server.ws.send({ type: 'full-reload' });
            }
          });
        },
      },
      viteSingleFile(),
      handlebars({
        helpers: {
          ...helpers,
          // Add translation helper
          t: (key) => translations[lang][key] || key
        },
        partialDirectory: resolve(__dirname, 'src/partials'),
        // Re-read JSON each transform so dev picks up edits; resume-cli still passes a static object via () => resume
        context: () => ({
          resume: getResume(),
        }),
      }),
    ],
  });
};