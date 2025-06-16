<script setup>
    import { ref } from 'vue';
    import {useEvents} from '@/useEvents.js';
    const { createEvent } = useEvents();

    const eventTeam = ref('');
    const eventType = ref('');
    const eventTitle = ref('');
    const eventStart = ref('');
    const eventEnd = ref('');
    const eventLocation = ref('');

    function handleCreateEvent() {
        if (!eventTeam.value || !eventTitle.value || !eventStart.value || !eventEnd.value || !eventLocation.value) {
            alert('Bitte alle Felder ausfüllen');
            return;
        }

        createEvent(eventTeam.value, eventType.value, eventTitle.value, eventStart.value, eventEnd.value, eventLocation.value);
        console.log('Event sent');

        eventTeam.value = '';
        eventType.value = '';
        eventTitle.value = '';  
        eventStart.value = '';
        eventEnd.value = '';
        eventLocation.value = '';
    }
</script>

<template>
    <button class="btn" onclick="form_modal.showModal()">Add Event</button>

    <dialog id="form_modal" class="modal">
        <div class="modal-box">
            <h3 class="text-lg font-bold">Add Event</h3>

            <!-- form -->
            <form class="space-y-4 mt-4">
                <!-- Team Category Dropdown -->
                <div>
                    <label class="label">
                    <span class="label-text">Team Category</span>
                    </label>
                    <select v-model="eventTeam" class="select select-bordered w-full">
                    <option disabled value="">Select category</option>
                    <option>Herren</option>
                    <option>Damen</option>
                    <option>U18 m</option>
                    <option>U18 w</option>
                    <option>U16 m</option>
                    <option>U16 w</option>
                    <option>U14 g</option>
                    <option>U12 g</option>
                    </select>
                </div>

                <!-- Type Dropdown -->
                <div>
                    <label class="label">
                    <span class="label-text">Type</span>
                    </label>
                    <select v-model="eventType" class="select select-bordered w-full">
                    <option disabled value="">Select type</option>
                    <option>training</option>
                    <option>game</option>
                    </select>
                </div>

                <!-- Title -->
                <div>
                    <label class="label">
                    <span class="label-text">Title</span>
                    </label>
                    <input v-model="eventTitle" type="text" placeholder="Event title" class="input input-bordered w-full" />
                </div>

                <!-- Start -->
                <div>
                    <label class="label">
                    <span class="label-text">Start</span>
                    </label>
                    <input v-model="eventStart" type="datetime-local" class="input input-bordered w-full" />
                </div>

                <!-- End -->
                <div>
                    <label class="label">
                    <span class="label-text">End</span>
                    </label>
                    <input v-model="eventEnd" type="datetime-local" class="input input-bordered w-full" />
                </div>

                <!-- Location -->
                <div>
                    <label class="label">
                    <span class="label-text">Location</span>
                    </label>
                    <input v-model="eventLocation" type="text" placeholder="Location" class="input input-bordered w-full" />
                </div>

                <!-- Submit Button -->
                <div class="flex justify-end">
                    <button class="btn btn-primary" type="submit" @click="handleCreateEvent">Save</button>
                    <div class="modal-action">
                        <form method="dialog">
                            <button class="btn">Close</button>
                        </form>
                    </div>
                </div>
            </form>
        </div>
    </dialog>
</template>
