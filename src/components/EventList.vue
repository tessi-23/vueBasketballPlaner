<script setup>
    import { ref } from 'vue';
    import {useLogin} from '@/useLogin.js';
    import {useEvents} from '@/useEvents.js';
    const {isParticipant, updateParticipants, getUserOfCurrentParticipants, userOfCurrentParticipants} = useEvents();
    const { currentUser } = useLogin();

    getUserOfCurrentParticipants();
    const participantsModalRef = ref(null);

    defineProps({
      events: Array,
      title: String,
      isLoggedIn: Boolean
    });


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
      console.log('Aktuelle Teilnehmer:', updatedParticipants);
      await updateParticipants(event.id, updatedParticipants);

      event.participants = updatedParticipants; // im ui aktualisieren
    };

    function openParticipantsModal(eventItem) {
      getUserOfCurrentParticipants(eventItem);
      participantsModalRef.value?.showModal();
    }
</script>

<template>
  <div class="events">
    <p v-if="events.length === 0" class="text-center text-sm opacity-60">No upcoming games.</p>
    <ul v-if="events.length !== 0" class="list bg-base-100 rounded-box shadow-md">
      <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">{{ title }}</li>

      <li v-for="eventItem in events" :key="eventItem.id" class="list-row">
        <div><img class="size-10 rounded-box" src="../assets/basketball-icon.png"/></div>
        <div>
          <div>{{ eventItem.title }} ({{ eventItem.start }} - {{ eventItem.end }})</div>
          <div class="text-xs uppercase font-semibold opacity-60">
            {{ eventItem.location }} <span v-if="isLoggedIn">(participants: {{ eventItem.participants.length }})</span>
          </div>
        </div>
        <button v-if="isLoggedIn && currentUser.role.includes('player')" 
          class="btn btn-outline" 
          @click="toggleParticipation(eventItem)">
          {{ isParticipant(eventItem) ? 'Cancel' : 'Participate' }}
        </button>
        <button v-if="isLoggedIn" class="btn" @click="openParticipantsModal(eventItem)">Show participants
        </button>
      </li>
    </ul>
  </div>

  <dialog ref="participantsModalRef" class="modal">
    <div class="modal-box">
      <h3 class="text-lg font-bold">Participants</h3>
      <div v-if="userOfCurrentParticipants.length === 0">
        <p class="text-sm text-gray-500">No participants yet.</p>
      </div>
      <div v-for="participant in userOfCurrentParticipants" :key="participant.id">
        👤 {{ participant.username }}
      </div>

      <div class="modal-action">
        <form method="dialog">
          <button class="btn">Close</button>
        </form>
      </div>
    </div>
  </dialog>
</template>
