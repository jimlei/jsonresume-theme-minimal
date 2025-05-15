const 
  defineConfig = require('vite').defineConfig;
  resolve = require('path').resolve,
  viteSingleFile = require('vite-plugin-singlefile').viteSingleFile,
  handlebars = require('vite-plugin-handlebars'),
  helpers = require('handlebars-helpers')();

module.exports = (resume) => {
  const lang = process.env.RESUME_VARIANT || 'en';
  const { translations } = require('./src/translations');

  return defineConfig({
    plugins: [
      viteSingleFile(),
      handlebars({
        helpers: {
          ...helpers,
          // Add translation helper
          t: (key) => translations[lang][key] || key
        },
        partialDirectory: resolve(__dirname, 'src/partials'),
        context: {
          resume: resume,
        }
      })
    ]
  });
};