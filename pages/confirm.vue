<script setup lang="ts">
const user = useSupabaseUser()
const router = useRouter()

definePageMeta({
  layout: 'default'
})

watch(user, () =>  {
  if (user.value) {
    return router.push('/')
  }
}, { immediate: true }) 
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <UCard>
      <template #header>
        <div class="text-center">Processing login...</div>
      </template>
      <div class="text-center p-4">
        <UButton loading variant="ghost" size="xl" />
        <p class="mt-4 text-sm text-gray-500">
          You will be redirected automatically.
        </p>
      </div>
    </UCard>
  </div>
</template>