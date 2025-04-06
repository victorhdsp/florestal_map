import { ref } from 'vue';

export const commandSelected = ref([])
export const selectedStates = ref<string[]>([]);

export function getMoreRecentDate(positions: { date: string }[]) {
    return positions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
}

export function toggleStateFilter(state: string) {
    if (selectedStates.value.includes(state)) {
        selectedStates.value = selectedStates.value.filter((s) => s !== state);
    } else {
        selectedStates.value.push(state);
    }
}