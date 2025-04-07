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
                    <div class="marker">
                        <UAvatar
                            size="sm"
                            :alt="marker.name.replace(/-/g, ' ')"
                            class="icon"
                        />
                    </div>
                </LIcon>
            </LMarker>
        </LMap>
    </div>
</template>

<script lang="ts" setup>
import type { IMarker, LeafletMap } from './type';
import { ref, defineProps } from 'vue'

const map = ref<LeafletMap|null>(null);
const center = ref([-22.9068, -43.1729]);

const props = defineProps({
    markers: {
        type: Array as () => IMarker[],
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
        props.markers.map((marker: IMarker) => {
            return [marker.position.lat, marker.position.lon]
        })
    );
}
</script>

<style lang="scss" scoped>
    .marker {
        .icon {
            @apply relative z-0;
            @apply translate-x-[-50%] translate-y-[-50%];
        }

        &[data-active="true"] {
            
            .icon {
                @apply z-10;
                @apply scale-125 shadow-lg;
                @apply transition-all duration-200;
            }
        }
    }
</style>