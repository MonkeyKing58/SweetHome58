const path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
            @import "@/assets/styles/_variables.sass"
        `
      }
    }
  },

  configureWebpack:  {
    plugins: process.env.NODE_ENV === 'production' ? [
      new PrerenderSPAPlugin({
        // Required - The path to the webpack-outputted app to prerender.
        staticDir: path.join(__dirname, 'dist'),
        // Required - Routes to render.
        routes: [ '/', '/lk', '/login', '/flatlist_for_work', '/conditions', '/feedbacks', '/about', '/contacts', '/flat/КА_04', '/flat/CH_42', '/flat/PU_15', '/flat/SU_165', '/flat/PU_7', '/flat/PL_14_D', '/flat/VO_11', '/flat/TA_01', '/flat/PL_14_E', '/flat/PL_14_F', '/flat/SU_151', '/flat/KUL_2', '/flat/PU_45', '/flat/MI_67', '/flat/MK_13', '/flat/PL_14_G', '/flat/PL_14_H', '/flat/SP_15' ],
      })
    ] : []
  }
}