/* eslint-disable no-console */
export default function (context) {
  // if (process.server) {
  console.log('[Middleware] Check Auth, refreshed page !')
  // console.log(context.req.headers.cookie)
  return context.store.dispatch('auth/initAuth', context.req)
  // } else {
  //   console.log('[Middleware] Check Auth, page modified on the client only !')
  // }
}
