<script setup lang="ts">
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const toast = useToast()
import type { AuthError } from '@supabase/supabase-js'
import { ref } from 'vue'

definePageMeta({
  layout: 'default'
})

const showPassword = ref(false)
const showConfirmPassword = ref(false)

const state = reactive({
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const displayError = (error: AuthError) => {
  toast.add({
    title: 'Error',
    description: error.message,
    icon: 'i-lucide-alert-circle',
    color: 'error',
  })
}

async function handleRegister() {
  if (state.password.length < 8) {
    toast.add({
      title: 'Password is too short',
      description: 'Password must have at least 8 characters.',
      icon: 'i-lucide-alert-circle',
      color: 'error',
    })
    return
  }

  if (state.password !== state.confirmPassword) {
    toast.add({
      title: 'Error',
      description: 'Password and password confirmation do not match.',
      icon: 'i-lucide-alert-circle',
      color: 'error',
    })
    return 
  }

  const { data, error } = await supabase.auth.signUp({
    email: state.email,
    password: state.password,
    options: {
      data: {
        full_name: state.fullName,
      },
      emailRedirectTo: `${window.location.origin}/confirm`
    }
  })

  if (error) {
    return displayError(error)
  }

  if (data.user && !data.session) {
    toast.add({
      title: 'Registration succesfully!',
      description: 'Please check the email and verify the account.',
      icon: 'i-lucide-mail-check', 
      color: 'primary',
    })
  }
}

watchEffect(() => {
  if (user.value) {
    return navigateTo('/')
  }
})

useSeoMeta({
  title: 'Register - Planty',
  description: 'Create an account in just a few easy steps and enjoy the convenience of shopping for your favorite plants.',
})
</script>

<template>
  <UContainer class="min-h-screen flex items-center justify-center">
    <UCard class="w-full max-w-sm">
      <template #header>
        <div class="text-center">
          <UIcon name="i-lucide-user-circle" class="text-4xl mb-2" />
          <h1 class="text-2xl font-bold">Create new account</h1>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Create an account in just a few easy steps and enjoy the convenience of shopping for your favorite plants.
          </p>
        </div>
      </template>

      <UForm :state="state" @submit="handleRegister" class="space-y-4">

        <UFormField label="Full Name" name="fullName" required>
          <UInput
            v-model="state.fullName"
            placeholder="Enter your name"
            class="w-full"
          />
        </UFormField>

        <UFormField label="Email" name="email" description="We'll never share your email with anyone else." required>
          <UInput
            v-model="state.email"
            placeholder="you@example.com"
            class="w-full"
          />
        </UFormField>

        <UFormField label="Password" name="password" required>
          <UInput
            v-model="state.password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Enter your password"
            class="w-full"
            :trailing-icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
            @click:trailing="showPassword = !showPassword"
          />
        </UFormField>

        <UFormField label="Confirm Password" name="confirmPassword" required>
          <UInput
            v-model="state.confirmPassword"
            :type="showConfirmPassword ? 'text' : 'password'"
            placeholder="Enter your password again"
            class="w-full"
            :trailing-icon="showConfirmPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
            @click:trailing="showConfirmPassword = !showConfirmPassword"
          />
        </UFormField>

        <UButton type="submit" block>
          Continue
        </UButton>
      </UForm>

      <p class="text-sm text-center text-gray-500 dark:text-gray-400 mt-4">
        Already have account?
        <NuxtLink to="/login" class="text-primary font-medium hover:underline">Login</NuxtLink>
      </p>

      <template #footer>
        <p class="text-xs text-center text-gray-500 dark:text-gray-400">
          By continuing, you agree to our Terms & Conditions.
        </p>
      </template>
    </UCard>
  </UContainer>
</template>
