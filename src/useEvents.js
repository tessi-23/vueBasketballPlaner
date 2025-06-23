import {readonly, ref} from "vue";
import {pb} from '@/pocketbase.js'
import {useLogin} from "@/useLogin.js";
const {currentUser} = useLogin();

const listOfTrainings = ref([]);
const listOfGames = ref([]);
const listOfEvents = ref([]);
const userOfCurrentParticipants = ref([]);




export function useEvents() {
    const getListOfAllEvents = async () => {
        const record = await pb.collection('events').getFullList({
            expand: 'team_category',
        });
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

    const getUserOfCurrentParticipants = async (event) => {
        if(event === undefined) {
            console.log('event undefined');
            return;
        }
        const record = await pb.collection('events').getOne(event.id, {
            expand: 'participants',
        });

        console.log('Current participants with user:', record);

        userOfCurrentParticipants.value = record.expand.participants || [];
    }

    const createEvent = async (team, type, title, start, end, location) => {
        const newEvent = {
            team_category: team,
            type: type,
            title: title,
            start: start,
            end: end,
            location: location
        };
        const record = await pb.collection('events').create(newEvent);
        console.log('Event created: ', record);
    };

    const updateParticipants = async (eventId, participants) => {
        const record = await pb.collection('events').update(eventId, {
            participants: participants
        });
        console.log('Updated Participants: ', record);
    };

    const isParticipant = (event) => {
        if (!currentUser.value || event.participants.length === 0) return false;
        if (event.participants.includes(currentUser.value.id)) return true;
    };

    return {
        listOfTrainings,
        listOfGames,
        listOfEvents,
        userOfCurrentParticipants,
        getUserOfCurrentParticipants,
        getListOfAllEvents,
        getListOfGames,
        getListOfTrainings,
        createEvent,
        isParticipant,
        updateParticipants
    }
}