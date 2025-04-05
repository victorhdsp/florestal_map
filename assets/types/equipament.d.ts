export interface IEquipmentState {
    id: string;
    name: string;
    color: string;
}

export interface IHourlyEarnings {
    equipmentState: IEquipmentState;
    value: number;
}

export interface IEquipmentModel {
    id: string;
    name: string;
    hourlyEarnings: IHourlyEarnings[];
}

export interface IPositionHistory {
    date: string;
    lat: number;
    lon: number;
}

export interface IStateHistory {
    date: string;
    equipmentState: IEquipmentState;
}

export interface IEquipment {
    id: string;
    name: string;
    equipmentModel: IEquipmentModel;
    positionsHistory: IPositionHistory[];
    statesHistory: IStateHistory[];
}