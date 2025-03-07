const 
  defineConfig = require('vite').defineConfig;
  resolve = require('path').resolve,
  viteSingleFile = require('vite-plugin-singlefile').viteSingleFile,
  handlebars = require('vite-plugin-handlebars'),
  helpers = require('handlebars-helpers')();;
 

module.exports = (resume) => {
  return defineConfig({
    plugins: [
      viteSingleFile(),
      handlebars({
        helpers: helpers,
        partialDirectory: resolve(__dirname, 'src/partials'),
        context: {
          resume: resume,
        }
      })
    ]
  });
};