// File: middleware/auth.ts
// KODE INI HANYA BERJALAN DI HALAMAN YANG DITANDAI "middleware: 'auth'"
export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser()

  if (!user.value) {
    // Jika ada yang coba masuk ke halaman privat (seperti /profil) tanpa login,
    // maka bawa dia ke halaman login.
    return navigateTo('/login')
  }
})