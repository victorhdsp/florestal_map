<template>
    <LayoutHome>
        <template #aside>
            <div class="home-aside">
                <UCommandPalette
                    v-model="commandSelected"
                    multiple
                    nullable
                    :autoselect="false"
                    :groups="[{ key: 'equipment', commands: commands }]"
                    :fuse="{ resultLimit: 12, fuseOptions: { threshold: 0.1 } }"
                    placeholder="Selecione um equipamento..."
                />
                <div class="state-filters">
                    <button
                        v-for="state in ['Operando', 'Parado', 'Manutenção']"
                        :key="state"
                        :class="{ selected: selectedStates.includes(state) }"
                        @click="toggleStateFilter(state)"
                    >
                        {{ state }}
                    </button>
                </div>
            </div>
        </template>
        <template #content>
            <ClientOnly>
                <MapHome :markers="markers" />
            </ClientOnly>
        </template>
    </LayoutHome>
</template>

<script lang="ts" setup>
import type { Command } from "../node_modules/@nuxt/ui/dist/runtime/types/command-palette";
import type { IEquipment, IPositionHistory, IStateHistory } from "../assets/types/equipament";
import type { IMarkerHome } from "../components/map/type";
import { commandSelected, getMoreRecentDate, selectedStates, toggleStateFilter } from "./utils";
import { useEquipmentStore } from "../store/equipments";

const useEquipment = useEquipmentStore();

const filteredEquipments = computed<IEquipment[]>(() => {
  let list = useEquipment.getEquipments();
  
  if (commandSelected.value.length > 0) {
    list = list.filter((equipment: IEquipment) =>
      commandSelected.value.some((command: Command) => command.id === equipment.id)
    );
  }
  
  if (selectedStates.value.length > 0) {
    list = list.filter((equipment: IEquipment) => {
      const equipmentState = (getMoreRecentDate(equipment.statesHistory) as IStateHistory).equipmentState.name;
      return selectedStates.value.includes(equipmentState);
    });
  }
  
  return list;
});

const commands = computed<Command[]>(() =>
    filteredEquipments.value.map((equipment: IEquipment) => ({
        id: equipment.id,
        label: equipment.name,
        state: equipment.statesHistory[0].equipmentState,
    }))
);

const markers = computed<IMarkerHome[]>(() =>
    filteredEquipments.value.map((equipment: IEquipment) => ({
        uid: equipment.id,
        name: equipment.name,
        position: getMoreRecentDate(equipment.positionsHistory) as IPositionHistory,
        state: (getMoreRecentDate(equipment.statesHistory) as IStateHistory).equipmentState,
        path: `/equipment/${equipment.name}`,
    }))
);
</script>

<style scoped lang="scss">
    .home-aside {
        @apply flex flex-col justify-between h-full;

        .state-filters {
            @apply grid grid-cols-3 justify-center rounded-md overflow-hidden;
        
            button {
                @apply px-4 py-2 bg-gray-100 cursor-pointer transition;
        
                &.selected {
                    @apply bg-gray-200;
                }
        
                &:hover {
                    @apply bg-gray-300;
                }
            }
        }
    }
</style>