import {readonly, ref} from "vue";
import {pb} from '@/pocketbase.js'
import {useLogin} from "@/useLogin.js";
const {currentUser} = useLogin();

const listOfTrainings = ref([]);
const listOfGames = ref([]);
const listOfEvents = ref([]);

export function useEvents() {
    const getListOfAllEvents = async () => {
        const record = await pb.collection('events').getFullList({});
        console.log('All events:', record);
        listOfEvents.value = record || [];
    }

    const getListOfTrainings = async () => {
        const record = await pb.collection('events').getFullList({
            filter: 'type = "training"'
        });
        console.log('All trainings:', record);
        listOfTrainings.value = record || [];
    }

    const getListOfGames = async () => {
        const record = await pb.collection('events').getFullList({
            filter: 'type = "games"'
        });
        console.log('All games:', record);
        listOfGames.value = record || [];
    }

    return {
        listOfTrainings: readonly(listOfTrainings),
        listOfGames: readonly(listOfGames),
        listOfEvents: readonly(listOfEvents),
        getListOfAllEvents,
        getListOfGames,
        getListOfTrainings
    }
}