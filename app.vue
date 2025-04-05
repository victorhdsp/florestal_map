<template>
  <div id="body">
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { getEquipments } from './assets/js/getEquipments';
import type { IEquipment } from './assets/types/equipament';
import { useEquipmentStore } from './store/equipments';

const useEquipment = useEquipmentStore();

const equipments: IEquipment[] = getEquipments();
useEquipment.addEquipments(equipments);

</script>