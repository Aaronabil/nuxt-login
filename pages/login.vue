<script setup lang="ts">
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const toast = useToast()
import type { AuthError } from '@supabase/supabase-js'

definePageMeta({
  layout: 'blank'
})

watchEffect(() => {
  if (user.value) {
    return navigateTo('/')
  }
})

const fields = [{
  name: 'email',
  type: 'text' as const,
  label: 'Email',
  placeholder: 'Please enter your email',
  required: true,
}, {
  name: 'password',
  label: 'Password',
  type: 'password' as const,
  placeholder: 'Please enter your password',
}]

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
</script>

<template>
  <UContainer class="min-h-screen flex items-center justify-center">
    <UPageCard class="max-w-sm w-full">
      <UAuthForm
        title="Welcome to Planty!"
        description="Please sign in to continue"
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
          <div class="relative flex items-center justify-center">
          <div class="absolute border-t border-gray-300 dark:border-gray-700 w-full"></div>
            <span class="relative bg-white dark:bg-gray-900 px-2 text-sm text-gray-500 dark:text-gray-400">
              or
            </span>
          </div>
        </template>

      <template #description>
        Dont have account?
        <NuxtLink to="/register" class="text-primary font-medium">Register here</NuxtLink>
      </template>
      
        <template #footer>
          By continuing, you agree to our Terms & Conditions.
        </template>
      </UAuthForm>
    </UPageCard>
  </UContainer>
</template>
