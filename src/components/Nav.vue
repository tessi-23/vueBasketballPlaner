<script setup>
import {useLogin} from "@/useLogin.js";
const {isLoggedIn, logout} = useLogin();
</script>


<template>
    <div class="navbar bg-base-100 shadow-sm">
      <div class="flex-1">
        <RouterLink to="/" class="btn btn-ghost text-xl">Home</RouterLink>
        <RouterLink to="/games" class="btn btn-ghost text-xl">Games</RouterLink>
        <RouterLink to="/trainings" class="btn btn-ghost text-xl">Trainings</RouterLink>
      </div>
      <div class="flex gap-2">
        <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
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