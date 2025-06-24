<script setup>
  import {useLogin} from "@/useLogin.js";
  import {useTeams} from "@/useTeams.js";
  import {useEvents} from "@/useEvents.js";
  import EventForm from "@/components/EventForm.vue";
  import EventList from "@/components/EventList.vue";

  const {isLoggedIn, currentUser} = useLogin();
  const {getListOfTeams, listOfTeams} = useTeams();
  const {listOfTrainings, getListOfTrainings} = useEvents();

  getListOfTrainings();
  getListOfTeams();
</script>




<template>
  <EventForm v-if="isLoggedIn && currentUser.role.includes('admin')"></EventForm>
  <EventList :events="listOfTrainings" :title="'All Trainings'" :is-logged-in="isLoggedIn" :type="'training'" />
</template>