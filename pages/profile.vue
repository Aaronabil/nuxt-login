<script setup lang="ts">
// TEMPATKAN "PENJAGA" DI SINI
definePageMeta({
  middleware: 'auth'
})

const user = useSupabaseUser()

// Anda bisa tambahkan logika untuk mengambil data profil dari database di sini
</script>

<template>
  <UContainer class="py-12">
    <h1 class="text-4xl font-bold">Profil Saya</h1>
    <div v-if="user" class="mt-4 space-y-2">
      <p><strong>Nama:</strong> {{ user.user_metadata.full_name || user.user_metadata.display_name || 'Tidak ada' }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
    </div>
  </UContainer>
</template>