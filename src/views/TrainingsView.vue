<script setup>
  import {useLogin} from "@/useLogin.js";
  import {useEvents} from "@/useEvents.js";
  import EventList from "@/components/EventList.vue";

  const {isLoggedIn} = useLogin();
  const {listOfTrainings} = useEvents();
</script>




<template>
  <EventList :events="listOfTrainings" :title="'All Trainings'" :is-logged-in="isLoggedIn" :type="'training'" />
</template>