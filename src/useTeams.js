import {readonly, ref} from "vue";
import {pb} from '@/pocketbase.js'
import {useLogin} from "@/useLogin.js";
const {currentUser} = useLogin();

const currentUserTeams = ref([]);

export function useTeams() {
    const getTeamOfCurrentUser = async () => {
        if (!currentUser.value) {
            return null;
        }
        const record = await pb.collection('users').getOne(currentUser.value.id, {
            expand: 'teams',
        });

        console.log('Current user teams:', record);

        currentUserTeams.value = record.expand.teams || [];
    }

    return {
        currentUserTeams: readonly(currentUserTeams),
        getTeamOfCurrentUser
    }
}