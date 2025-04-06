export interface IMarker {
    uid: string
    position: IPositionHistory
}

export interface IMarkerHome extends IMarker {
    state: IEquipmentState
    name: string
    path?: string
}

export type LeafletMap = {
    leafletObject: {
        fitBounds: (bounds: number[][]) => void
    }
};