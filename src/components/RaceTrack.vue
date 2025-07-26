<template>
  <div class="mt-3">
    
    <!-- Race Schedule -->
    <div class="race-schedule">
      <h6 class="mb-3">Race Schedule</h6>
      <div class="row">
        <div 
          v-for="(race, index) in raceStore.raceSchedule" 
          :key="race.raceNumber"
          class="col-2"
          :class="{ 'text-primary fw-bold': raceStore.currentRaceIndex === index }"
        >
          <strong>Race {{ race.raceNumber }}</strong><br>{{ race.distance }}m
        </div>
      </div>
    </div>
    
    <!-- Race Track -->
    <div class="race-track">
      <h6 class="text-white mb-3">Race Track</h6>
      <div 
        v-for="i in 10" 
        :key="i"
        class="track-lane"
      >
        <span class="lane-number">Lane {{ i }}</span>
        <i 
          class="fas fa-horse horse-icon" 
          :style="{ 
            color: getCurrentRaceHorse(i - 1)?.color || '#ccc' 
          }"
        ></i>
        <span v-if="getCurrentRaceHorse(i - 1)" class="horse-name">
          {{ getCurrentRaceHorse(i - 1).name }}
        </span>
      </div>
    </div>
    
  </div>
</template>

<script>
import { useRaceStore } from '../stores/raceStore'

export default {
  name: 'RaceTrack',
  setup() {
    const raceStore = useRaceStore()
    
    const getCurrentRaceHorse = (index) => {
      if (raceStore.currentRaceIndex >= 0 && 
          raceStore.raceSchedule[raceStore.currentRaceIndex]) {
        return raceStore.raceSchedule[raceStore.currentRaceIndex].horses[index]
      }
      return null
    }
    
    return { 
      raceStore,
      getCurrentRaceHorse 
    }
  }
}
</script>

<style scoped>
.race-track {
  background-color: #1f2e24;
  border-radius: 8px;
  padding: 20px;
  min-height: 500px;
}

.track-lane {
  height: 48px;
  border-bottom: 2px solid #e8e8e8;
  display: flex;
  align-items: center;
  margin-bottom: 2px;
}

.lane-number {
  color: #e8e8e8;
  font-weight: bold;
  margin-right: 15px;
  min-width: 80px;
}

.horse-icon {
  font-size: 24px;
  margin-left: 10px;
  margin-right: 10px;
}

.horse-name {
  color: #e8e8e8;
  font-size: 12px;
}

.race-schedule {
  background-color: white;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
}
</style>