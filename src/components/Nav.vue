<script setup>
  import { computed } from 'vue';
  import {useLogin} from "@/useLogin.js";
  import EventForm from "@/components/EventForm.vue";
  const {isLoggedIn, currentUser, logout} = useLogin(); 

  const avatarUrl = computed(() => {
    if (!currentUser.value?.avatar) return 'https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg';
    return `http://localhost:8090/api/files/_pb_users_auth_/${currentUser.value.id}/${currentUser.value.avatar}`;
  });
</script>


<template>
    <div class="navbar bg-base-100 shadow-sm">
      <div class="flex-1">
        <!-- <RouterLink to="/" class="btn btn-ghost text-xl">Home</RouterLink> -->
        <RouterLink to="/games" class="btn btn-ghost text-xl">Games</RouterLink>
        <RouterLink to="/trainings" class="btn btn-ghost text-xl">Trainings</RouterLink>
        <EventForm v-if="isLoggedIn && currentUser.role.includes('admin')"></EventForm>
      </div>
      <div class="flex gap-2">
        <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <img
                :alt="currentUser?.username"
                :src="avatarUrl"
              />
            </div>
          </div>
          <ul
            tabindex="0"
            class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li v-if="isLoggedIn"><RouterLink to="/profile">Profile</RouterLink></li>
            <li v-if="isLoggedIn">
              <RouterLink to="/login" @click="logout">Logout</RouterLink>
            </li>
            <li v-else>
              <RouterLink to="/login" >Login</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>