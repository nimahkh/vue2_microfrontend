const routes = [
  {
    path: '/dashboard',
    name: 'main',
    component: () => import(/* webpackChunkName: "appMainHome" */ '../components/main')
  },
]

export default routes