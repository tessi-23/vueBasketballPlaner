<script setup>
    import { ref, computed } from 'vue';
    import {useLogin} from '@/useLogin.js';
    import {useEvents} from '@/useEvents.js';
    import {useTeams} from "@/useTeams.js";
    const {isParticipant, updateParticipants, getUserOfCurrentParticipants, userOfCurrentParticipants, getListOfAllEvents, listOfEvents} = useEvents();
    const {getListOfTeams, listOfTeams} = useTeams();
    const { currentUser } = useLogin();

    //getUserOfCurrentParticipants();
    getListOfTeams();
    getListOfAllEvents();

    

    const participantsModalRef = ref(null); // ref für DOM Element dialog
    const selectedTeamFilter = ref('');


    const props = defineProps({
      events: Array,
      title: String,
      isLoggedIn: Boolean,
      type: String,
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

    const openParticipantsModal = async (eventItem) => {
      await getUserOfCurrentParticipants(eventItem);
      participantsModalRef.value?.showModal(); // dialog öffnen
    }

    const filterByTeam = (teamName) => {
      selectedTeamFilter.value = teamName;
    };

    const filteredEvents = computed(() => {
      // richtigen type filtern
      return listOfEvents.value.filter(event =>
        event.type === props.type &&
        (!selectedTeamFilter.value || event.expand?.team_category?.name === selectedTeamFilter.value)
      );
    });



    function formatDate(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleDateString('de-DE'); // 26.06.2025
    }

    function formatTime(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleTimeString('de-DE', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }); // zb 18:00
    }


    

</script>

<template>
  <form class="filter">
    <input class="btn btn-square" type="reset" value="x" @click="selectedTeamFilter = ''"/>
    <input v-for="team in listOfTeams" :key="team.id"
      class="btn"
      type="radio"
      name="teamFilter"
      :value="team.name"
      :aria-label="team.name"
      @change="filterByTeam(team.name)"
    />
  </form>


  <div class="events">
    <p v-if="filteredEvents.length === 0" class="text-center text-sm opacity-60">No upcoming games.</p>
      <ul v-else class="list bg-base-100 rounded-box shadow-md">

      <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">{{ title }}</li>

      <li v-for="eventItem in filteredEvents" :key="eventItem.id" class="list-row">
        <div><img class="size-10 rounded-box" src="../assets/basketball-icon.png"/></div>
        <div>
          {{ eventItem.title }} {{ formatDate(eventItem.start) }} ({{ formatTime(eventItem.start) }} - {{ formatTime(eventItem.end) }})
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

  <!-- ref mit dialog verknüpfen -->
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
