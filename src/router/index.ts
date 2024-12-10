import { createRouter, createWebHistory } from 'vue-router'
import store from '../store';

const routes = [
  {
    path: '/artdecco',
    meta: { title: 'ArtDecco', name: 'Index', parent: true },
    component: () => import('../components/Layouts/IndexLayout.vue'),
    children: [
      // {
      //   path: '/login',
      //   alias: '/login',
      //   component: () => import('../views/LoginView.vue'),
      //   meta: { title: 'Login', ParentName: 'Index'}
      // },
      {
        path: '/admin_login',
        alias: '/admin_login',
        component: () => import('../views/AdminLoginView.vue'),
        meta: { title: 'Admin Login', ParentName: 'Index'}
      },
      // {
      //   path: '/signup',
      //   alias: '/signup',
      //   component: () => import('../views/SignUpView.vue'),
      //   meta: { title: 'Sign up', ParentName: 'Index'}
      // } 
      {
       path: '/products',
       alias: '/products',
       component: () => import('../Product/ListProductView.vue'),
      
       },
       {
        path: "/selectedProduct/:id",
        name: "SelectedProduct",
        component: () => import('../Product/selectedProductView.vue'),
      
        props: true,
      },
    ]
  },
  {
    path: '/home',
    meta: { title: 'Home', name: 'Home', parent: true },
    component: () => import('../components/Layouts/DashboardLayout.vue'),
    children: [
      {
        path: '/admin_dashboard',
        alias: '/admin_dashboard',
        component: () => import('../views/AdminDashboardView.vue'),
        meta: { title: 'Admin Dashboard', ParentName: 'Home'}
      },
      {
        path: '/create_product',
        alias: '/create_product',
        component: () => import('../views/CreateProductView.vue'),
        meta: { title: 'Create Product', ParentName: 'Home'}
      }, {
        path: '/create_bulk',
        alias: '/create_bulk',
        component: () => import('../components/Bulk/BulkAccessories.vue'),
        meta: { title: 'Create Product', ParentName: 'Home'}
      },
      {
        path: '/list_products',
        alias: '/list_products',
        component: () => import('../views/ListProductView.vue'),
        meta: { title: 'List of Products', ParentName: 'Home'}
      },
      {
        path: '/user_menu',
        alias: '/user_menu',
        component: () => import('../views/UserMenuListView.vue'),
        meta: { title: 'User Menu', ParentName: 'Home'}
      },
      {
        path: '/assign_user',
        alias: '/assign_user',
        component: () => import('../views/AssignUserMenuView.vue'),
        meta: { title: 'Assign User Menu', ParentName: 'Home'}
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const role = store.state.user;
  if (to.matched.some(record => record.meta.Index)) {
      if (!role) {
          next({ path: '/artdecco'})
      } else {
        document.title = "Artdecco - " + to.meta.title;
        next()
      }
  }
  else {
    document.title = "Artdecco - " + to.meta.title;
      next()
  }
})

export default router
