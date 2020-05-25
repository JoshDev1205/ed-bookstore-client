import AuthorPage from './pages/Author'
import ListAuthor from './components/List'
import EditAuthor from './components/Edit'

export const AuthorRoutes = [
  {
    path: '/author',
    component: AuthorPage,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '/',
        component: ListAuthor,
      },
      {
        path: ':id',
        component: EditAuthor,
        name: 'editauthor',
      },
    ],
  },
]
