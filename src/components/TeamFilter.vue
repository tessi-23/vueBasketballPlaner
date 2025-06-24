<script setup>
    defineProps({
        teams: Array,
        filter: String
    });
    defineEmits(['update:filter']);

</script>

<template>
  <form class="filter my-4 mx-6">
    <input
      class="btn btn-square"
      type="reset"
      value="x"
      @click="$emit('update:filter', '')"
    />
    <input
      v-for="team in teams"
      :key="team.id"
      class="btn"
      type="radio"
      name="teamFilter"
      :value="team.name"
      :aria-label="team.name"
      @change="$emit('update:filter', team.name)"
    />
  </form>
</template>
