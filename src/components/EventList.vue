<script setup>
    import { ref } from 'vue';
    import {useLogin} from '@/useLogin.js';
    import {useEvents} from '@/useEvents.js';
    import {useTeams} from "@/useTeams.js";
    import { useDateFormat, useNow } from '@vueuse/core';
    import { useFilter } from '@/useFilter.js';
    import TeamFilter from '@/components/TeamFilter.vue';
    const {
      isParticipant, 
      toggleParticipation, 
      getUserOfCurrentParticipants, 
      userOfCurrentParticipants, 
      getListOfAllEvents, 
      listOfEvents
    } = useEvents();
    const {getListOfTeams, listOfTeams} = useTeams();
    const { currentUser, getUserImage } = useLogin();



    getListOfTeams();
    getListOfAllEvents();

    const participantsModalRef = ref(null); // ref für DOM Element dialog
    const selectedTeamFilter = ref('');
    const formatStartDate = (dateStr) => useDateFormat(dateStr, 'DD.MM.YYYY').value;
    const formatTime = (dateStr) => useDateFormat(dateStr, 'HH:mm').value;


    const props = defineProps({
      events: Array,
      title: String,
      isLoggedIn: Boolean,
      type: String,
    });

    const openParticipantsModal = async (eventItem) => {
      await getUserOfCurrentParticipants(eventItem);
      participantsModalRef.value?.showModal(); // dialog öffnen
    }

    const { filteredEvents } = useFilter(listOfEvents, selectedTeamFilter, props.type); 
</script>

<template>
  <TeamFilter :teams="listOfTeams" v-model:filter="selectedTeamFilter"/>

  <div class="events mx-6">
    <p v-if="filteredEvents.length === 0" class="text-center text-sm opacity-60">No upcoming games.</p>
      <ul v-else class="list bg-base-100 rounded-box shadow-md">

      <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">{{ title }}</li>

      <li v-for="eventItem in filteredEvents" :key="eventItem.id" class="list-row">
        <div><img class="size-10 rounded-box" src="../assets/basketball-icon.png"/></div>
        <div>
          {{ formatStartDate(eventItem.start) }} ({{ formatTime(eventItem.start) }} - {{ formatTime(eventItem.end) }})
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
        <p class="text-sm">No participants yet.</p>
      </div>
      <div v-for="participant in userOfCurrentParticipants" :key="participant.id"  class="flex items-center gap-3 mb-3">
        <img
          class="w-10 h-10 rounded-full object-cover"
          :alt="participant.username"
          :src="getUserImage(participant)"
        /> <span>{{ participant.username }}</span>
      </div>

      <div class="modal-action">
        <form method="dialog">
          <button class="btn">Close</button>
        </form>
      </div>
    </div>
  </dialog>
</template>
