<script setup>
    import { ref, defineExpose } from 'vue'

    const props = defineProps({
        participants: {
            type: Array,
            required: true,
        },
        getUserImage: {
            type: Function,
            required: true,
        },
    })

    const dialogRef = ref(null)

    // damit shoModal von parent verwendbar ist
    defineExpose({
        showModal: () => dialogRef.value?.showModal(),
    })
</script>

<template>
  <dialog ref="dialogRef" class="modal">
    <div class="modal-box">
      <h3 class="text-lg font-bold">Participants</h3>

      <div v-if="participants.length === 0">
        <p class="text-sm">No participants yet.</p>
      </div>

      <div v-for="participant in participants" :key="participant.id"
        class="flex items-center gap-3 mb-3"
      >
        <img
          class="w-10 h-10 rounded-full object-cover"
          :alt="participant.username"
          :src="getUserImage(participant)"
        />
        <span>{{ participant.username }}</span>
      </div>

      <div class="modal-action">
        <form method="dialog">
          <button class="btn">Close</button>
        </form>
      </div>
    </div>
  </dialog>
</template>
