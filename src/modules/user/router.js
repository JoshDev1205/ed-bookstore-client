import UserPage from './pages/User'

export const UserRoutes = [
  {
    path: '/',
    name: 'home',
    component: UserPage,
    meta: {
      requiresAuth: true,
    },
  },
]
