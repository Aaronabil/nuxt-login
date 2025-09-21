import { useSupabaseClient, useSupabaseUser } from "#imports"
import type { AuthError } from '@supabase/supabase-js'

export function useAuth() {
    const supabase = useSupabaseClient()
    const user = useSupabaseUser()
    const toast = useToast()

    const displayError = (error: AuthError) => {
        toast.add({
            title: 'Error',
            description: error.message,
            icon: 'i-lucide-alert-circle',
            color: 'error',
        })
    }

    const signIn = async (email: string, password: string) => {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) return displayError(error)

        toast.add({
            title: 'Login Succes!',
            icon: 'i-lucide-check-circle',
        })
    }

    const signInWithGoogle = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/confirm`
            },
        })
        if (error) displayError(error)

        toast.add({
            title: 'Login Succes!',
            icon: 'i-lucide-check-circle',
        })
    }

    return { user, signIn, signInWithGoogle, toast }
}