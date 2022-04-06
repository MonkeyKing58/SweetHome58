import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import locale from 'element-plus/lib/locale/lang/ru'
import 'element-plus/lib/theme-chalk/display.css'

export default (app) => {
  app.use(ElementPlus, { locale })
}