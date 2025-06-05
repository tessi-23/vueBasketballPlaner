<script setup>
  import {useLogin} from "@/useLogin.js";
  import {useTeams} from "@/useTeams.js";
  const {currentUser, isLoggedIn} = useLogin();
  const {currentUserTeams, getTeamOfCurrentUser} = useTeams();
  getTeamOfCurrentUser();
</script>


<template>
  <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
    <table class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Role</th>
          <th>Teams</th>
        </tr>
      </thead>
      <tbody>
        <!-- Dynamische Zeile für eingeloggten Nutzer -->
        <tr v-if="isLoggedIn">
          <td>{{ currentUser.username }}</td>
          <td>
            <div v-for="role in currentUser.role" :key="role">{{ role }}</div>
          </td>
          <td>
            <div v-for="team in currentUserTeams" :key="team.id">{{ team.name }}</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>