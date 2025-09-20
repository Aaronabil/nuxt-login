<script setup lang="ts">
import type { AuthError } from '@supabase/supabase-js'

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const toast = useToast()

definePageMeta({
  layout: 'blank'
})

watchEffect(() => {
  if (user.value) {
    return navigateTo('/')
  }
})

const fields = [{
  name: 'fullName',
  type: 'text' as const,
  label: 'Nama Lengkap',
  placeholder: 'Masukkan nama lengkap Anda',
  required: true,
}, {
  name: 'email',
  type: 'email' as const,
  label: 'Email',
  placeholder: 'Masukkan email Anda',
  required: true,
}, {
  name: 'password',
  label: 'Password',
  type: 'password' as const,
  placeholder: 'Buat password Anda',
  required: true,
}, {
  name: 'confirmPassword',
  label: 'Konfirmasi Password',
  type: 'password' as const,
  placeholder: 'Masukkan ulang password Anda',
  required: true,
}]

const displayError = (error: AuthError | string) => {
  toast.add({
    title: 'Error',
    description: typeof error === 'string' ? error : error.message,
    icon: 'i-lucide-alert-circle',
    color: 'error',
  })
}

const signUp = async (fullName: string, email: string, password: string, confirmPassword: string) => {
  if (password !== confirmPassword) {
    return displayError('Password tidak cocok')
  }

  const { error, data } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName
      }
    }
  })

  if (error) return displayError(error)

  toast.add({
    title: 'Registrasi berhasil!',
    description: 'Silakan cek email Anda untuk verifikasi.',
    icon: 'i-lucide-check-circle',
  })
  
  await navigateTo('/login')
}

async function onSubmit(payload: { data: { fullName: string, email: string, password: string, confirmPassword: string } }) {
  const { fullName, email, password, confirmPassword } = payload.data
  await signUp(fullName, email, password, confirmPassword)
}
</script>

<template>
  <UContainer class="min-h-screen flex items-center justify-center">
    <UPageCard class="max-w-sm w-full">
      <UAuthForm
        title="Buat Akun Baru"
        description="Silakan lengkapi data diri Anda"
        icon="i-lucide-user-plus"
        :fields="fields"
        @submit="onSubmit"
      >
        <template #description>
          Sudah punya akun?
          <NuxtLink to="/login" class="text-primary font-medium">Login di sini</NuxtLink>
        </template>
        
        <template #footer>
          Dengan mendaftar, Anda setuju dengan Syarat & Ketentuan kami.
        </template>
      </UAuthForm>
    </UPageCard>
  </UContainer>
</template>