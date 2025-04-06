import { defineStore } from 'pinia';
import type { IEquipment } from '../assets/types/equipament';

interface EquipmentState {
    equipments: Record<string, IEquipment>;
}

export const useEquipmentStore = defineStore('equipment', {
    state: (): EquipmentState => ({
        equipments: {}
    }),
    actions: {
        addEquipments(equipments: IEquipment[]): void {
            const equipmentMap: Record<string, IEquipment> = {};
            equipments.forEach((equipment) => {
                equipmentMap[equipment.name] = equipment;
            });
            this.equipments = equipmentMap;
        },
        getEquipments(): IEquipment[] {
            return Object.values(this.equipments);
        },
        getEquipment(name: string): IEquipment | undefined {
            return this.equipments[name];
        },
    },
});