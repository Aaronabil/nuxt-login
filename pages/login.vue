<script setup lang="ts">
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const toast = useToast()
import type { AuthError } from '@supabase/supabase-js'

// State untuk beralih antara mode Login ('in') dan Registrasi ('up')
const sign = ref<'in' | 'up'>('in')

// Jika pengguna sudah login, langsung arahkan ke halaman utama
watchEffect(() => {
  if (user.value) {
    return navigateTo('/')
  }
})

// Definisi input field untuk form
const fields = [{
  name: 'email',
  type: 'text' as const,
  label: 'Email',
  placeholder: 'Masukkan email Anda',
  required: true,
}, {
  name: 'password',
  label: 'Password',
  type: 'password' as const,
  placeholder: 'Masukkan password Anda',
}]

// --- PERUBAHAN DI SINI ---
// Provider diubah dari GitHub ke Google
const signInWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/confirm`,
    },
  })
  if (error) displayError(error)
}

const signIn = async (email: string, password: string) => {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  if (error) return displayError(error)

  // Tambahan: Beri notifikasi sukses saat login berhasil
  toast.add({
    title: 'Login berhasil!',
    icon: 'i-lucide-check-circle',
  })
}

const signUp = async (email: string, password: string) => {
  const { error } = await supabase.auth.signUp({
    email,
    password,
  })
  if (error) return displayError(error)

  toast.add({
    title: 'Registrasi berhasil',
    description: 'Silakan cek email Anda untuk verifikasi.',
    icon: 'i-lucide-check-circle',
  })
  // Setelah registrasi, tidak langsung login agar pengguna verifikasi email dulu
}

async function onSubmit(payload: { data: { email: string, password: string } }) {
  const email = payload.data.email
  const password = payload.data.password

  if (sign.value === 'in') await signIn(email, password)
  else await signUp(email, password)
}

const displayError = (error: AuthError) => {
  toast.add({
    title: 'Error',
    description: error.message,
    icon: 'i-lucide-alert-circle',
    color: 'error',
  })
}
</script>

<template>
  <UContainer class="h-[calc(100vh-var(--header-height))] flex items-center">
    <UPageCard class="max-w-sm w-full mx-auto">
      <UAuthForm
        :title="sign === 'in' ? 'Selamat Datang' : 'Buat Akun Baru'"
        :description="sign === 'in' ? 'Silakan login untuk melanjutkan' : ''"
        icon="i-lucide-user-circle"
        :fields="fields"
        @submit="onSubmit"
      >
        <template #providers>
          <UButton color="neutral" block label="Google" @click="signInWithGoogle">
            <template #leading>
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                class="h-5 w-5"
              />
            </template>
          </UButton>
        </template>

        <template #description>
          {{ sign === 'up' ? 'Sudah punya akun?' : 'Belum punya akun?' }}
          <UButton
            variant="link"
            class="p-0"
            @click="sign = sign === 'up' ? 'in' : 'up'"
          >
            {{ sign === 'in' ? 'Daftar di sini' : 'Login' }}
          </UButton>
        </template>

        

        <template #footer>
          Dengan melanjutkan, Anda setuju dengan Syarat & Ketentuan kami.
        </template>
      </UAuthForm>
    </UPageCard>
  </UContainer>
</template>
