<script setup lang="ts">
const user = useSupabaseUser()
const supabase = useSupabaseClient()

const handleLogout = async () => {
  await supabase.auth.signOut()
  await navigateTo('/') 
}

useSeoMeta({
  title: 'TokoCommerce - Your One-Stop Online Shop',
  description: 'Discover a wide range of products at TokoCommerce. Shop now for the best deals and offers!',
  ogTitle: 'TokoCommerce - Your One-Stop Online Shop',
  ogDescription: 'Discover a wide range of products at TokoCommerce. Shop now for the best deals and offers!',
  ogImage: '/og-image.png',
})
</script>

<template>
  <header class="bg-white dark:bg-gray-800 shadow-sm">
    <UContainer class="flex items-center justify-between h-16">
      <NuxtLink to="/" class="text-xl font-bold text-primary">
        TokoCommerce
      </NuxtLink>

      <nav class="flex items-center gap-4">
        <div v-if="user" class="flex items-center gap-4">
          <NuxtLink to="/profile" class="text-gray-600 dark:text-gray-300 hover:text-primary">
            Profile
          </NuxtLink>
          <UButton color="error" variant="soft" @click="handleLogout">
            Logout
          </UButton>
        </div>
        <div v-else>
          <UButton color="neutral" to="/login">
            Login
          </UButton>
        </div>
      </nav>
    </UContainer>
  </header>
</template>