<template>
    <LayoutPage :markers="markers">
        <div class="home">
            <h1>home</h1>
        </div>
    </LayoutPage>
</template>

<script lang="ts" setup>
import type { IEquipment, IPositionHistory, IStateHistory } from '../assets/types/equipament';
import type { IMarker } from '../components/map/index.vue';
import { useEquipmentStore } from '../store/equipments';

const useEquipment = useEquipmentStore();

function getMoreRecentDate(positions: { date: string }[]) {
    return positions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
}

const markers: IMarker[] = useEquipment.equipments.map((equipment: IEquipment) => ({
    uid: equipment.id,
    name: equipment.name,
    position: getMoreRecentDate(equipment.positionsHistory) as IPositionHistory,
    state: (getMoreRecentDate(equipment.statesHistory) as IStateHistory).equipmentState,
}));

</script>

<style scoped lang="scss">
</style>