<script setup>
    import {useLogin} from '@/useLogin.js';
    import {useEvents} from '@/useEvents.js';
    const {isParticipant, updateParticipants} = useEvents();
    const { currentUser } = useLogin();

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
</script>

<template>
  <div class="events">
    <p v-if="events.length === 0" class="text-center text-sm opacity-60">No upcoming games.</p>
    <ul v-if="events.length !== 0" class="list bg-base-100 rounded-box shadow-md">
      <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">{{ title }}</li>

      <li v-for="event in events" :key="event.id" class="list-row">
        <div><img class="size-10 rounded-box" src="../assets/basketball-icon.png"/></div>
        <div>
          <div>{{ event.title }} ({{ event.start }} - {{ event.end }})</div>
          <div class="text-xs uppercase font-semibold opacity-60">
            {{ event.location }} <span v-if="isLoggedIn">(participants: {{ event.participants.length }})</span>
          </div>
        </div>
        <button v-if="isLoggedIn && currentUser.role.includes('player')" 
          class="btn btn-outline" 
          @click="toggleParticipation(event)">
          {{ isParticipant(event) ? 'Cancel' : 'Participate' }}
        </button>
        <button v-if="isLoggedIn" class="btn" onclick="participants_modal.showModal()">Show participants</button>
      </li>
    </ul>
  </div>

  <dialog id="participants_modal" class="modal">
    <div class="modal-box">
      <h3 class="text-lg font-bold">Participants</h3>
      <p class="py-4">TODO: User einfügen</p>
      <div class="modal-action">
        <form method="dialog">
          <button class="btn">Close</button>
        </form>
      </div>
    </div>
  </dialog>
</template>
