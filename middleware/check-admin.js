export default function (context) {
  // console.log('check-admin')
  // console.log(`is admin ? ${!context.store.getters["auth/userInfos"].role !== 'admin'}`)
  if (context.store.getters["auth/userInfos"]) {
    if (context.store.getters["auth/userInfos"].role !== 'admin') {
      context.redirect("/login"); 
    }
  } else {
    context.redirect("/login");
  }
}