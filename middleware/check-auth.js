export default function (context) {
  console.log("Check Auth");

  // console.log(context)
  console.log(context.route.path)

  return context.store.dispatch("auth/initAuth", context.req);
}
