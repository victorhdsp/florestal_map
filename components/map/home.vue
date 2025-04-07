<template>
    <div style="height:100%; width:100%">
        <LMap 
            ref="map" 
            :zoom="10" 
            :center="center" 
            :use-global-leaflet="false"
            @ready="onReady"
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
                <LIcon>
                    <div
                        class="marker"
                    >
                        <UAvatar
                            :chip-color="colorMap[marker.state.name]"
                            chip-text=""
                            chip-position="top-right"
                            size="sm"
                            :alt="marker.name.replace(/-/g, ' ')"
                            class="icon"
                        />
                    </div>
                </LIcon>
                <LPopup class="inner_popup">
                    <h3>{{marker.name}}</h3>
                    <p>Produtividade: {{ 10 }}</p>
                    <EquipmentStatus
                        :color="marker.state.color"
                        :name="marker.state.name"
                    />
                    <UButton
                        :to="marker.path"
                        label="Ver detalhes"
                        icon="material-symbols-light:arrow-right-alt"
                        trailing
                    />
                </LPopup>
            </LMarker>
        </LMap>
    </div>
</template>

<script lang="ts" setup>
import type { AvatarChipColor } from '../../node_modules/@nuxt/ui/dist/runtime/types/avatar';
import type { IMarkerHome, LeafletMap } from './type';
import { ref, defineProps } from 'vue'

const colorMap: Record<string, AvatarChipColor> = {
    "Operando": "green",
    "Parado": "yellow",
    "Manutenção": "red"
}

const map = ref<LeafletMap|null>(null);
const center = ref([-22.9068, -43.1729]);

const props = defineProps({
    markers: {
        type: Array as () => IMarkerHome[],
        required: true,
    }
})

for (let i = 0; i < props.markers.length; i++) {
    center.value[0] += props.markers[i].position.lat
    center.value[1] += props.markers[i].position.lon
}

center.value[0] /= props.markers.length
center.value[1] /= props.markers.length

function onReady () {
    if (!map.value) return
    
    map.value.leafletObject.fitBounds(
        props.markers.map((marker: IMarkerHome) => {
            return [marker.position.lat, marker.position.lon]
        })
    );
}
</script>

<style lang="scss" scoped>
    .inner_popup {
        @apply flex flex-col gap-2 items-center;

        p {
            @apply m-0;
        }
    }
    .marker {
        .icon {
            @apply translate-x-[-50%] translate-y-[-50%];
        }
    }
</style>