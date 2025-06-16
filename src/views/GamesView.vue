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
  <form v-if="listOfGames.length !== 0" class="filter">
    <input class="btn btn-square" type="reset" value="x"/>
    <input class="btn" type="radio" name="frameworks" aria-label="Herren"/>
    <input class="btn" type="radio" name="frameworks" aria-label="Damen"/>
    <input class="btn" type="radio" name="frameworks" aria-label="U18 m"/>
    <input class="btn" type="radio" name="frameworks" aria-label="U18 w"/>
    <input class="btn" type="radio" name="frameworks" aria-label="U16 m"/>
    <input class="btn" type="radio" name="frameworks" aria-label="U16 w"/>
    <input class="btn" type="radio" name="frameworks" aria-label="U14 g"/>
    <input class="btn" type="radio" name="frameworks" aria-label="U12 g"/>
  </form>

  <EventList :events="listOfGames" :title="'All Games'" :is-logged-in="isLoggedIn" />
</template>