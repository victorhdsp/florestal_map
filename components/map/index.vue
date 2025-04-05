<template>
    <div style="height:100%; width:100%">
        <LMap 
            ref="map" 
            :zoom="zoom" 
            :center="center" 
            :use-global-leaflet="false"
            @ready="ready"
        >
            <LTileLayer 
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
                layer-type="base" name="OpenStreetMap"
            />
            <LMarker
                v-for="(marker, index) in props.markers"
                :key="index"
                :lat-lng="[marker.position.lat, marker.position.lon]"
            >
                <LPopup class="inner_popup">
                    <h3>{{marker.name}}</h3>
                    <EquipmentStatus
                        :color="marker.state.color"
                        :name="marker.state.name"
                    />
                </LPopup>
            </LMarker>
        </LMap>
    </div>
</template>

<script lang="ts" setup>
import { ref, defineProps } from 'vue'
import type { IEquipmentState, IPositionHistory } from '../../assets/types/equipament'

export interface IMarker {
    position: IPositionHistory
    state: IEquipmentState
    name: string
    uid: string
}

const props = defineProps({
    markers: {
        type: Array as () => IMarker[],
        required: true,
    }
})

const map = ref(null)
const zoom = ref(10)
const center = ref([-22.9068, -43.1729])
let lat = 0
let lon = 0

for (let i = 0; i < props.markers.length; i++) {
    lat += props.markers[i].position.lat
    lon += props.markers[i].position.lon
}

lat /= props.markers.length
lon /= props.markers.length
center.value = [lat, lon]

function ready () {
    if (!map.value) return
    type LeafletMap = { leafletObject: { fitBounds: (bounds: number[][]) => void } };
    (map.value as LeafletMap).leafletObject.fitBounds(
        props.markers.map((marker: IMarker) => {
            return [marker.position.lat, marker.position.lon]
        })
    );
}
</script>

<style>

</style>