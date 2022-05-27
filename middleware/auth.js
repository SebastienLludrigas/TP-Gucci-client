export default function (context) {
  if (!context.store.getters["auth/connected"]) {
    context.redirect("/Login");
  }
}
