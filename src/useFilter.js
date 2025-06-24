import { computed } from 'vue';

export function useFilter(listOfEvents, selectedTeamFilter, type) {
    const filteredEvents = computed(() => {
      return (listOfEvents.value || []).filter(event =>
        event.type === type &&
        (!selectedTeamFilter.value || event.expand?.team_category?.name === selectedTeamFilter.value)
      );
    });

    return {
        filteredEvents
    };
}

    