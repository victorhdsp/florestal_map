<template>
    <LayoutEquipment>
        <template #aside>
            <div class="equipment-aside">
                <h1>Nome: {{ metadata.name }}</h1>
                <h2>Equipamento: {{ metadata.equipment }}</h2>
                <div class="state-history">
                    <h2>Histórico de estados</h2>
                    <ul class="list-days">
                        <li v-for="(states, day) in groupedStateHistory" :key="day" class="day">
                            <h3>{{ day }}</h3>
                            <p>Produtividade: {{ calcProductivity(day) }}%</p>
                            <ul class="list-items">
                                <li 
                                    v-for="(state, index) in states" 
                                    :key="index"
                                    class="item"
                                    :style="`--color: ${state.equipmentState.color}`"
                                >
                                    <EquipmentStatus
                                        :color="state.equipmentState.color"
                                        :name="state.equipmentState.name" />
                                    <span class="date">{{ new Date(state.date).toLocaleTimeString() }}</span>
                                </li>
                            </ul>
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
import type { IEquipment, IPositionHistory, IStateHistory } from '../../assets/types/equipament';
import type { IMarker } from '../../components/map/type';
import { useEquipmentStore } from '../../store/equipments';
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
const route = useRoute();
const router = useRouter();

const useEquipment = useEquipmentStore();
const hasEquipement = useEquipment.getEquipment(route.params.name as string);
const selectedDate = ref<IPositionHistory[]>([]);

dayjs.locale('pt-br');

if (!hasEquipement) {
    console.error('Equipment not found');
    router.push('/404');
}

const equipment = hasEquipement as IEquipment;

useHead({
  title: equipment.name,
  meta: [
    {
      name: "description",
      content: equipment.equipmentModel.name
    }
  ]
});

const markers = computed<IMarker[]>(() => {
    return equipment.positionsHistory.map((position: IPositionHistory) => {
        return {
            uid: equipment.id,
            name: equipment.name,
            position: position,
            active: selectedDate.value.some((date: IPositionHistory) => date.date === position.date),
        };
    })
});

const metadata = computed(() => {
    return {
        id: equipment.id,
        name: equipment.name,
        equipment: equipment.equipmentModel.name,
        stateHistory: equipment.statesHistory,
        productive: 10
    };
});

const groupedStateHistory = computed<Record<string, IStateHistory[]>>(() => {
    const grouped: Record<string, IStateHistory[]> = {};
    const states = metadata.value.stateHistory;
    states.forEach((state: IStateHistory) => {
        const date = dayjs(state.date).format('DD/MM/YYYY');
        if (!grouped[date]) {
            grouped[date] = [];
        }
        const newDate = dayjs(state.date).format('DD/MM/YYYY');
        if (newDate === date)
            grouped[date].push(state);
    });
    return grouped;
});

function calcProductivity(day: string): number {
  const states = groupedStateHistory.value[day] || [];
  let hours = 0;
  let operatingStart: unknown | null = null;
  
  for (let i = states.length - 1; i >= 0; i--) {
    const currentState = states[i];
    
    if (currentState.equipmentState.name === 'Operando' && !operatingStart) {
        operatingStart = dayjs(currentState.date);
    }

    if (operatingStart && currentState.equipmentState.name !== 'Operando') {
        const diff = dayjs(currentState.date).diff(operatingStart);
        const diffHours = Math.abs(diff) / (1000 * 60 * 60);
        hours += diffHours;
        operatingStart = null;
    }
  }
  
  if (operatingStart) {
    const endDay = dayjs(operatingStart).endOf('day');
    const diff = dayjs(endDay).diff(operatingStart);
    const diffHours = Math.abs(diff) / (1000 * 60 * 60);
    hours += diffHours;
  }
  
  const productiveHours = Math.max(0, hours);
  return Math.round((productiveHours / 24) * 100);
}
</script>

<style scoped lang="scss">
.equipment-aside {
    @apply flex flex-col gap-1 h-full;

    .state-history {
        @apply flex flex-col gap-1;
        @apply mt-5 h-full overflow-hidden;

        .list-days {
            @apply flex flex-col gap-2;
            @apply pr-2 h-full;
            @apply overflow-y-scroll;

            .day {
                @apply flex flex-col;
                
                .list-items {
                    @apply flex flex-col gap-1;
                    @apply pl-2 mt-2;

                    .item {
                        @apply p-2;
                        @apply relative cursor-pointer;
                        @apply flex gap-2 items-center;

                        .date {
                            @apply text-sm;
                        }
        
                        &::after {
                            @apply content-[''];
                            @apply bg-[var(--color)] rounded-md opacity-10;
                            @apply absolute left-0 top-0 w-full h-full z-0;
                        }
                    }
                }
            }
        }
    }
}
</style>