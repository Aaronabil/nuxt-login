<template>
  <UContainer class="flex items-center justify-center min-h-screen">
    <UCard class="w-full max-w-sm">
      <template #header>
        <h1 class="text-2xl font-bold text-center">Reset Password</h1>
        <p class="text-sm text-center text-gray-500">
          Masukkan email Anda untuk menerima link reset password.
        </p>
      </template>

      <UForm :state="state" @submit="handleSubmit">
        <UFormGroup label="Email" name="email" class="mb-6">
          <UInput v-model="state.email" placeholder="you@example.com" icon="i-heroicons-envelope" />
        </UFormGroup>

        <UButton type="submit" block class="mb-4">Kirim Link Reset</UButton>
        
        <div class="text-center">
          <ULink to="/login" class="text-sm text-primary">Kembali ke Login</ULink>
        </div>
      </UForm>
    </UCard>
  </UContainer>
</template>

<script setup lang="ts">
definePageMeta({
  layouts: 'default'
})

const state = reactive({
  email: ''
})

function handleSubmit() {
  // Logika untuk forgot password dengan Supabase akan kita tambahkan di sini
  console.log('Form disubmit:', state)
  alert('Link reset password dikirim! (cek konsol)')
}
</script>