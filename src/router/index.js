import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from "firebase/auth"
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: { layout: 'map' },
    props: true,
    component: () => import('../views/Home.vue')
  },
  {
    path: '/conditions',
    name: 'Conditions',
    meta: { layout: 'default' },
    component: () => import('../views/Conditions.vue')
  },
  {
    path: '/feedbacks',
    name: 'Feedbacks',
    meta: { layout: 'default' },
    component: () => import('../views/Feedbacks.vue')
  },
  {
    path: '/about',
    name: 'About',
    meta: { layout: 'default' },
    component: () => import('../views/About.vue')
  },
  {
    path: '/contacts',
    name: 'Contacts',
    meta: { layout: 'default' },
    component: () => import('../views/Contacts.vue')
  },
  {
    path: '/flat/:id',
    name: 'flat',
    meta: { layout: 'default' },
    component: () => import('../views/Flat.vue')
  },
  {
    path: '/flatlist_for_work',
    name: 'flatlist',
    meta: { layout: 'work', auth: true },
    component: () => import('../views/FlatList.vue')
  },
  {
    path: '/lk',
    name: 'lk',
    meta: { layout: 'default', auth: true },
    component: () => import('../views/Lk.vue')
  },
  {
    path: '/editor/:id',
    name: 'editor',
    meta: { layout: 'default', auth: true },
    component: () => import('../views/Editor.vue')
  },
  {
    path: '/creator',
    name: 'creator',
    meta: { layout: 'default', auth: true },
    component: () => import('../views/Creator.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: { layout: 'empty' },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: { layout: 'empty' },
    component: () => import('../views/Register.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    document.getElementById('app').scrollIntoView()
    
    const list__wrapper = document.getElementById('list__wrapper__id')
    if(list__wrapper) list__wrapper.scrollIntoView()
  }  
})

router.beforeEach((to, from, next) => {
  
  const requireAuth = to.matched.some(record => record.meta.auth)

  checkLogin(requireAuth).then((goNext) => {
    if(goNext) {
      store.dispatch('setUserID', goNext)
      next()
    } else {
      next('/login?message=before-login')
    }
  })

})

export default router


function checkLogin(requireAuth) {

  return new Promise((resolve) => {    

    if(requireAuth) {

      const auth = getAuth()
    
      onAuthStateChanged(auth, (user) => {
        if (user) {
          resolve(user.uid)
        } else {
          resolve(false)
        }
      })

    } else resolve(true)

  })
}