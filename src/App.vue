<script setup>
import { RouterView } from 'vue-router'
import Nav from './components/Nav.vue';

</script>

<template>
  <header>
    <Nav></Nav>
  </header>
  <RouterView />
</template>

<style>
  .dark {
    background: #252525;
    color: white;
  }
</style>
