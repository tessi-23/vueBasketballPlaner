<script setup>
  import {useLogin} from "@/useLogin.js";
  import {useTeams} from "@/useTeams.js";
  import {useEvents} from "@/useEvents.js";
  import EventList from "@/components/EventList.vue";

  const {isLoggedIn} = useLogin();
  const {getListOfTeams, listOfTeams} = useTeams();
  const {listOfTrainings, getListOfTrainings} = useEvents();
  //getTeamOfCurrentUser();
  getListOfTrainings();
  getListOfTeams();
</script>




<template>
  <!-- <form v-if="listOfTrainings.length !== 0" class="filter">
    <input class="btn btn-square" type="reset" value="x"/>
    <input v-for="team in listOfTeams" :key="team.id"
      class="btn"
      type="radio"
      name="teamFilter"
      :value="team.name"
      :aria-label="team.name"
      @change="filterByTeam(team.name)"
    />
  </form> -->

  <EventList :events="listOfTrainings" :title="'All Trainings'" :is-logged-in="isLoggedIn" :type="'training'" />
</template>