<template>
    <LayoutEquipment>
        <template #aside>
            <div class="equipment-aside">
                <h1>{{metadata.name}}</h1>
                <h2>{{metadata.equipment}}</h2>
                <div class="state-history">
                    <h3>State History</h3>
                    <ul>
                        <li v-for="(state, index) in metadata.stateHistory" :key="index" :style="`--color: ${state.equipmentState.color}`">
                            <EquipmentStatus :color="state.equipmentState.color" :name="state.equipmentState.name" />
                            <span class="date">{{new Date(state.date).toLocaleString()}}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </template>
        <template #content>
            <ClientOnly>
                <MapEquipment :markers="markers" />
            </ClientOnly>
        </template>
    </LayoutEquipment>
</template>

<script lang="ts" setup>
import type { IEquipment, IPositionHistory } from '../../assets/types/equipament';
import type { IMarker } from '../../components/map/type';
import { useEquipmentStore } from '../../store/equipments';
    const route = useRoute();
    const router = useRouter();
    
    const useEquipment = useEquipmentStore();
    const hasEquipement = useEquipment.getEquipment(route.params.name as string);
    
    if (!hasEquipement) {
        console.error('Equipment not found');
        router.push('/404');
    }

    const equipment = hasEquipement as IEquipment;

    const markers = computed<IMarker[]>(() => {
        return equipment.positionsHistory.map((position: IPositionHistory) => {
            return {
                uid: equipment.id,
                position: position,
            };
        })
    });

    const metadata = computed(() => {
        return {
            id: equipment.id,
            name: equipment.name,
            equipment: equipment.equipmentModel.name,
            stateHistory: equipment.statesHistory,
        };
    });
</script>

<style scoped lang="scss">
    .equipment-aside {
        @apply flex flex-col gap-1 h-full;
        
        .state-history {
            @apply flex flex-col gap-1;
            @apply mt-5 h-full overflow-hidden;

            ul {
                @apply flex flex-col gap-2;
                @apply pr-2 h-full;
                @apply overflow-y-scroll;

                li {
                    @apply flex flex-col;
                    @apply p-2;
                    @apply relative;
                    
                    .date {
                        @apply text-sm;
                    }

                    &::after {
                        @apply content-[''];
                        @apply bg-[var(--color)] rounded-md opacity-20;
                        @apply absolute left-0 top-0 w-full h-full -z-10;
                    }
                }
            }
        }
    }
</style>