<script setup lang="ts">
// TIDAK ADA definePageMeta({ middleware: 'auth' }) DI SINI
// Ini adalah halaman publik

const user = useSupabaseUser()
// ...sisa script untuk halaman utama
</script>

<template>
  <UContainer class="py-12">
    <h1 class="text-4xl font-bold">Halaman Utama</h1>
    <p class="mt-4 text-lg text-gray-600 dark:text-gray-300">
      Ini adalah konten untuk halaman utama (main content).
    </p>
  </UContainer>
</template>