<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const supabase = useSupabaseClient()
const user = useSupabaseUser()

const handleLogout = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error(error)
    return
  }
  await navigateTo('/login')
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center">
    <UCard class="w-full max-w-md">
      <template #header>
        <h1 v-if="user?.user_metadata.display_name" class="text-2xl font-bold text-center">
          Welcome, {{ user.user_metadata.display_name }}!
        </h1>
        <h1 v-else-if="user?.user_metadata.full_name" class="text-2xl font-bold text-center">
          Welcome, {{ user.user_metadata.full_name }}!
        </h1>
        <h1 v-else class="text-2xl font-bold text-center">
          Welcome!
        </h1>
      </template>

      <div class="text-center">
        <p class="text-gray-600 dark:text-gray-300">You succesfull login as:</p>
        <p v-if="user" class="font-medium text-lg text-primary mt-2 break-all">{{ user.email }}</p>
      </div>
      
      <template #footer>
        <UButton color="error" block @click="handleLogout">
          Logout
        </UButton>
      </template>
    </UCard>
  </div>
</template>