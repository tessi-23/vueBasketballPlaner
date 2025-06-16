<script setup>
  import {useLogin} from "@/useLogin.js";
  import {useTeams} from "@/useTeams.js";
  import {useEvents} from "@/useEvents.js";
  import EventList from "@/components/EventList.vue";
  import EventForm from "@/components/EventForm.vue";

  const {currentUser, isLoggedIn} = useLogin();
  const {currentUserTeams, getTeamOfCurrentUser} = useTeams();
  const {listOfTrainings, getListOfTrainings} = useEvents();
  //getTeamOfCurrentUser();
  getListOfTrainings();
</script>




<template>
  <form v-if="listOfTrainings.length !== 0" class="filter">
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

  <EventList :events="listOfTrainings" :title="'All Trainings'" :is-logged-in="isLoggedIn" />
</template>