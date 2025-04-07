import equipmentJson from '../data/equipments.json';
import equipmentModelJson from '../data/equipmentModel.json';
import equipmentStateJson from '../data/equipmentState.json';
import equipmentPositionHistoryJson from '../data/equipmentPositionHistory.json';
import equipmentStateHistoryJson from '../data/equipmentStateHistory.json';
import type { IEquipment, IEquipmentModel, IEquipmentState, IPositionHistory, IStateHistory } from '../types/equipament';

function getEquipmentState(equipamentStateId: string): IEquipmentState {
    const equipmentState = equipmentStateJson.find((state) => state.id === equipamentStateId);
    if (!equipmentState) {
        throw new Error(`Equipment state with id ${equipamentStateId} not found`);
    }
    return {
        id: equipmentState.id,
        name: equipmentState.name,
        color: equipmentState.color,
    };
}

function getEquipmentModel(equipamentModelId: string): IEquipmentModel {
    const equipmentModel = equipmentModelJson.find((model) => model.id === equipamentModelId);
    if (!equipmentModel) {
        throw new Error(`Equipment model with id ${equipamentModelId} not found`);
    }
    return {
        id: equipmentModel.id,
        name: equipmentModel.name,
        hourlyEarnings: equipmentModel.hourlyEarnings.map((hourlyEarnings) => {
            return {
                value: hourlyEarnings.value,
                equipmentState: getEquipmentState(hourlyEarnings.equipmentStateId),
            }
        })
    };
}

function getEquipmentStateHistory(equipamentId: string): IStateHistory[] {
    const equipmentStateHistory = equipmentStateHistoryJson.find((state) => state.equipmentId === equipamentId);
    if (!equipmentStateHistory) {
        throw new Error(`Equipment state history with id ${equipamentId} not found`);
    }
    const stateHistory: IStateHistory[] = equipmentStateHistory.states.map((state) => {
        return {
            date: state.date,
            equipmentState: getEquipmentState(state.equipmentStateId),
        }
    }).sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    return stateHistory;
}

function getPositionHistory(equipamentId: string): IPositionHistory[] {
    const equipmentPositionHistory = equipmentPositionHistoryJson.find((position) => position.equipmentId === equipamentId);
    if (!equipmentPositionHistory) {
        throw new Error(`Equipment position history with id ${equipamentId} not found`);
    }
    const positionHistory: IPositionHistory[] = equipmentPositionHistory.positions.map((position) => {
        return {
            date: position.date,
            lat: position.lat,
            lon: position.lon,
        }
    }).sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    return positionHistory;
}

export function getEquipments(): IEquipment[] {
    const equipments: IEquipment[] = equipmentJson.map((equipment) => {
        return {
            id: equipment.id,
            name: equipment.name,
            equipmentModel: getEquipmentModel(equipment.equipmentModelId),
            positionsHistory: getPositionHistory(equipment.id),
            statesHistory: getEquipmentStateHistory(equipment.id),
        }
    })
    return equipments;
}