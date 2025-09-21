<script setup lang="ts">
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const toast = useToast()
import type { AuthError } from '@supabase/supabase-js'

definePageMeta({
  layout: 'default'
})

const state = reactive({
  email: '',
  password: ''
})

watchEffect(() => {
  if (user.value) {
    return navigateTo('/')
  }
})

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

  toast.add({
    title: 'Login Success!',
    icon: 'i-lucide-check-circle',
  })
}

async function onSubmit(payload: { data: { email: string, password: string } }) {
  await signIn(payload.data.email, payload.data.password)
}

const displayError = (error: AuthError) => {
  toast.add({
    title: 'Error',
    description: error.message,
    icon: 'i-lucide-alert-circle',
    color: 'error',
  })
}

useSeoMeta({
  title: 'Login - Planty',
  description: 'Login to access your Planty account and manage your plants with ease.',
})
</script>

<template>
  <UContainer class="min-h-screen flex items-center justify-center">
    <UCard class="w-full max-w-sm">
      <template #header>
        <div class="text-center">
          <UIcon name="i-lucide-user-circle" class="text-4xl mb-2" />
          <h1 class="text-2xl font-bold">Welcome to Planty!</h1>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Please sign in to continue
          </p>
        </div>
      </template>

      <UButton color="neutral" variant="outline" block @click="signInWithGoogle">
        <template #leading>
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            class="h-5 w-5"
          />
        </template>
        Google
      </UButton>

      <div class="relative flex items-center justify-center my-2">
            <div class="absolute border-t border-gray-300 dark:border-gray-700 w-full"></div>
            <span class="relative bg-white dark:bg-gray-900 px-2 text-sm text-gray-500 dark:text-gray-400">
              or
            </span>
          </div>

      <UForm :state="state" @submit="onSubmit" class="space-y-4">
        <UFormField label="Email" name="email" required>
          <UInput
            v-model="state.email"
            placeholder="you@example.com"
            class="w-full"
          />
        </UFormField>

        <UFormField label="Password" name="password" required>
          <UInput
            v-model="state.password"
            type="password"
            placeholder="Enter your password"
            class="w-full"
          />
        </UFormField>

        <UButton type="submit" block>
          Continue
        </UButton>
      </UForm>

      <p class="text-sm text-center text-gray-500 dark:text-gray-400 mt-4">
        Dont have account?
        <NuxtLink to="/register" class="text-primary font-medium hover:underline">Register here</NuxtLink>
      </p>

      <template #footer>
        <p class="text-xs text-center text-gray-500 dark:text-gray-400">
          By continuing, you agree to our Terms & Conditions.
        </p>
      </template>
    </UCard>
  </UContainer>
</template>
