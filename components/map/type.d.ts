import type { IPositionHistory } from "../../assets/types/equipament"

export interface IMarker {
    uid: string
    position: IPositionHistory
    name: string
}

export interface IMarkerHome extends IMarker {
    state: IEquipmentState
    path?: string
}

export type LeafletMap = {
    leafletObject: {
        fitBounds: (bounds: number[][]) => void
    }
};