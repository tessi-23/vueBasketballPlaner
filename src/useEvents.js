import {ref} from "vue";
import {pb} from '@/pocketbase.js'
import {useLogin} from "@/useLogin.js";
import {useWebNotification} from "@vueuse/core";

const {currentUser} = useLogin();

const listOfTrainings = ref([]);
const listOfGames = ref([]);
const listOfEvents = ref([]);
const userOfCurrentParticipants = ref([]);

const { show, requestPermission } = useWebNotification({
    title: 'Event kann stattfinden',
    body: 'Dieses Event hat jetzt 6 Teilnehmende erreicht!',
    renotify: true,
    tag: 'event-notification',
});




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
            start: start.replace('T', ' ') + ':00',
            end: end.replace('T', ' ') + ':00',
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

    const toggleParticipation = async (event) => {
        const userId = currentUser.value?.id;
        if (!userId) return;

        // kopie erstellen, damit schreibbar
        let updatedParticipants = [...(event.participants || [])]; 

        if (isParticipant(event)) {
            updatedParticipants = updatedParticipants.filter(id => id !== userId); // abmelden
        } else {
            updatedParticipants.push(userId); // anmelden
        }
        console.log('Aktuelle Teilnehmer: ', updatedParticipants);
        await updateParticipants(event.id, updatedParticipants);

        event.participants = updatedParticipants; // im ui aktualisieren


        // webnotification
        if (updatedParticipants.length === 6) {
            if (Notification.permission === 'granted') {
                show();
                console.log('Notification sent: Dieses Event hat jetzt 6 Teilnehmende erreicht!');
            } else if (Notification.permission === 'default') {
                // Nur beim ersten Mal fragen
                const result = await requestPermission();
                if (result === 'granted') {
                    show();
                    console.log('Notification sent after permission granted.');
                } else {
                    console.warn('Benutzer hat Benachrichtigungen abgelehnt.');
                }
            } else {
                console.warn('Keine Berechtigung für Notifications.');
            }
        }
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
        updateParticipants,
        toggleParticipation
    }
}