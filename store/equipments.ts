import { defineStore } from 'pinia';
import type { IEquipment } from '../assets/types/equipament';

interface EquipmentState {
    equipments: IEquipment[];
}

export const useEquipmentStore = defineStore('equipment', {
    state: (): EquipmentState => ({
        equipments: [],
    }),
    actions: {
        addEquipments(equipments: IEquipment[]) {
            this.equipments = equipments;
        },
    },
});