<template>
  <UContainer class="flex items-center justify-center min-h-screen">
    <UCard class="w-full max-w-sm">
      <template #header>
        <h1 class="text-2xl font-bold text-center">Buat Akun Baru</h1>
        <p class="text-sm text-center text-gray-500">
          Sudah punya akun?
          <ULink to="/login" class="text-primary">Login di sini</ULink>
        </p>
      </template>

      <UForm :state="state" @submit="handleSubmit">
        <UFormGroup label="Email" name="email" class="mb-4">
          <UInput v-model="state.email" placeholder="you@example.com" icon="i-heroicons-envelope" />
        </UFormGroup>

        <UFormGroup label="Password" name="password" class="mb-6">
          <UInput v-model="state.password" type="password" placeholder="Buat password yang kuat" icon="i-heroicons-lock-closed" />
        </UFormGroup>
        
        <UFormGroup label="Konfirmasi Password" name="confirmPassword" class="mb-6">
          <UInput v-model="state.confirmPassword" type="password" placeholder="Ulangi password" icon="i-heroicons-lock-closed" />
        </UFormGroup>

        <UButton type="submit" block>Daftar</UButton>
      </UForm>
    </UCard>
  </UContainer>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'blank'
})

const state = reactive({
  email: '',
  password: '',
  confirmPassword: ''
})

function handleSubmit() {
  // Logika untuk register dengan Supabase akan kita tambahkan di sini
  console.log('Form disubmit:', state)
  alert('Registrasi diproses! (cek konsol)')
}
</script>