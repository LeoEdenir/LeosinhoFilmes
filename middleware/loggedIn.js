export default function ({ $toast, store, route, redirect }) {

  const unrestrictedRoutesNames = [
    'index',
    'login',
    'cadastro',
  ]

  if (!unrestrictedRoutesNames.includes(route.name) && store.state.auth.user === null) {
    $toast.error('Você precisa estar autenticado para acessar essa página.')
    return redirect('/login')
  }
}
