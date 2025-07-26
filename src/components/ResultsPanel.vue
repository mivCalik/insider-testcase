<template>
  <div class="mt-3">
    <div class="results-panel">
      <h5 class="mb-3">Race Results</h5>
      
      <!-- Show completed races in reverse order (latest first) -->
      <div 
        v-for="result in completedRaces" 
        :key="result.raceNumber"
        class="mb-4"
      >
        <h6>Race {{ result.raceNumber }} - {{ result.distance }}m</h6>
        <table class="table table-sm">
          <thead>
            <tr>
              <th>Pos</th>
              <th>Horse</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="raceResult in result.results" 
              :key="raceResult.horse.id"
              :class="{ 'table-warning': raceResult.position === 1 }"
            >
              <td>{{ raceResult.position }}</td>
              <td>{{ raceResult.horse.name }}</td>
              <td>{{ raceResult.time }}s</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Show upcoming races -->
      <div 
        v-for="result in upcomingRaces" 
        :key="result.raceNumber"
        class="mb-4"
      >
        <h6 class="text-muted">Race {{ result.raceNumber }} - {{ result.distance }}m</h6>
        <table class="table table-sm">
          <thead>
            <tr>
              <th>Pos</th>
              <th>Horse</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="3" class="text-muted text-center">Race not started yet</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- No program generated -->
      <div v-if="raceStore.raceResults.length === 0" class="text-muted text-center">
        <p>Generate program to see results</p>
      </div>
      
    </div>
  </div>
</template>

<script>
import { useRaceStore } from '../stores/raceStore'
import { computed } from 'vue'

export default {
  name: 'ResultsPanel',
  setup() {
    const raceStore = useRaceStore()
    
    const completedRaces = computed(() => {
      return raceStore.raceResults
        .filter(race => race.results.length > 0)
        .reverse() // Latest race first
    })
    
    const upcomingRaces = computed(() => {
      return raceStore.raceResults
        .filter(race => race.results.length === 0)
    })
    
    return { 
      raceStore,
      completedRaces,
      upcomingRaces
    }
  }
}
</script>

<style scoped>
.results-panel {
  background-color: white;
  border-radius: 8px;
  padding: 15px;
  max-height: 600px;
  overflow-y: auto;
}
</style>