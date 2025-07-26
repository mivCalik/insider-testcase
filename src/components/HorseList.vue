<template>
  <div class="mt-3">
    <h5 class="text-center mb-3">Horse List</h5>
    <table class="table table-sm">
      <thead>
        <tr>
          <th style="font-size: 12px;">Name</th>
          <th style="font-size: 12px;">Condition</th>
        </tr>
      </thead>
      <tbody>
        <tr 
          v-for="horse in raceStore.horses" 
          :key="horse.id"
          class="horse-row"
          :style="{ backgroundColor: horse.color }"
        >
          <td style="font-size: 11px;">{{ horse.name }}</td>
          <td style="font-size: 11px;">{{ horse.condition }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { useRaceStore } from '../stores/raceStore'
import { onMounted } from 'vue'

export default {
  name: 'HorseList',
  setup() {
    const raceStore = useRaceStore()
    
    onMounted(() => {
      raceStore.initializeHorses()
    })
    
    return { raceStore }
  }
}
</script>

<style scoped>
.horse-row {
  color: #343a40 !important;
  text-shadow: 1px 1px 0px rgba(255, 255, 255, 0.8);
  font-weight: 500;
}
</style>