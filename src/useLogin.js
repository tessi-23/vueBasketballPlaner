import {computed, readonly, ref} from "vue";
import {pb} from '@/pocketbase.js';

// Make variable Singleton to not create multiple storages for currentUser
// Move it out of the scope of the composable to make it a singleton automatically based on JS import/export
const currentUser = ref(null);

// Check if the user is still logged in through pb.authStore / token saved in localStorage
// If yes set the saved user to be the current user
if (!currentUser.value && pb.authStore.isValid && pb.authStore.record) {
    currentUser.value = pb.authStore.record;
    console.log('Logged in user loaded from localStorage: ', currentUser.value)
}

export function useLogin() {

    const login = async (email, password) => {
        const data = await pb.collection('users').authWithPassword(
            email,
            password,
        );
        currentUser.value = data.record;
        console.log('User logged in', currentUser.value);
    }

    const logout = () => {
        currentUser.value = null;
        pb.authStore.clear();
        console.log('User logged out', currentUser.value);
    }

    const isLoggedIn = computed(() => !!currentUser.value);

    const currentUserImage = computed(() => {
        if (!currentUser.value?.avatar) return 'https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg';
        return `http://localhost:8090/api/files/_pb_users_auth_/${currentUser.value.id}/${currentUser.value.avatar}`;
    });

    function getUserImage(user) {
        if (!user?.avatar) {
            return 'https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg';
        }
        return `http://localhost:8090/api/files/_pb_users_auth_/${user.id}/${user.avatar}`;
    }


    return {
        isLoggedIn,
        currentUser: readonly(currentUser),
        currentUserImage: readonly(currentUserImage),
        login,
        logout,
        getUserImage
    }
}