<script setup>
  import {useLogin} from "@/useLogin.js";
  import {useTeams} from "@/useTeams.js";
  import {useEvents} from "@/useEvents.js";
  import EventList from "@/components/EventList.vue";

  const {currentUser, isLoggedIn} = useLogin();
  const {currentUserTeams, getTeamOfCurrentUser} = useTeams();
  const {listOfGames, getListOfGames} = useEvents();
  //getTeamOfCurrentUser();
  getListOfGames();
</script>




<template>
  <EventList :events="listOfGames" :title="'All Games'" :is-logged-in="isLoggedIn" :type="'game'"/>
</template>