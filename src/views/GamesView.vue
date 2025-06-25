<script setup>
  import {useLogin} from "@/useLogin.js";
  import {useEvents} from "@/useEvents.js";
  import EventList from "@/components/EventList.vue";

  const {isLoggedIn} = useLogin();
  const {listOfGames} = useEvents();
</script>




<template>
  <EventList :events="listOfGames" :title="'All Games'" :is-logged-in="isLoggedIn" :type="'game'"/>
</template>