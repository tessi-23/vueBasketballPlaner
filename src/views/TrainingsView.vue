<script setup>
  import {useLogin} from "@/useLogin.js";
  import {useTeams} from "@/useTeams.js";
  import {useEvents} from "@/useEvents.js";
  import EventList from "@/components/EventList.vue";

  const {isLoggedIn} = useLogin();
  const {getListOfTeams, listOfTeams} = useTeams();
  const {listOfTrainings, getListOfTrainings} = useEvents();

  getListOfTrainings();
  getListOfTeams();
</script>




<template>
  <EventList :events="listOfTrainings" :title="'All Trainings'" :is-logged-in="isLoggedIn" :type="'training'" />
</template>