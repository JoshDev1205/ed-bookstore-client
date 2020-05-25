import BookPage from './pages/Book'
import ListBook from './components/List'
import EditBook from './components/Edit'

export const BookRoutes = [
  {
    path: '/book',
    component: BookPage,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '/',
        component: ListBook,
      },
      {
        path: ':id',
        component: EditBook,
        name: 'editbook',
      },
    ],
  },
]
