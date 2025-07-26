<template>
  <div class="container-fluid bg-light min-vh-100">
    
    <!-- Control Panel -->
    <div class="text-center py-3">
      <button 
        class="btn bg-dark text-light me-2"
        @click="generateProgram"
        :disabled="raceStore.isRacing"
      >
        Generate Program
      </button>
      <button 
        class="btn btn-lg bg-dark text-light" 
        @click="startRaces"
        :disabled="raceStore.raceSchedule.length === 0 || raceStore.isRacing"
      >
        {{ raceStore.isRacing ? 'Racing...' : 'Start Race' }}
      </button>
    </div>
    
    <!-- Main Content -->
    <div class="d-flex h-100">
      
      <!-- Left Margin (5%) -->
      <span style="width: 5%;"></span>
      
      <!-- Horse List Panel (10%) -->
      <span style="width: 10%;">
        <HorseList />
      </span>
      
      <!-- Race Track Panel (50%) -->
      <span style="width: 50%;">
        <RaceTrack />
      </span>
      
      <!-- Results Panel (30%) -->
      <span style="width: 30%;">
        <ResultsPanel />
      </span>
      
      <!-- Right Margin (5%) -->
      <span style="width: 5%;"></span>
      
    </div>
  </div>
</template>

<script>
import HorseList from './components/HorseList.vue'
import RaceTrack from './components/RaceTrack.vue'
import ResultsPanel from './components/ResultsPanel.vue'
import { useRaceStore } from './stores/raceStore'

export default {
  name: 'App',
  components: {
    HorseList,
    RaceTrack,
    ResultsPanel
  },
  setup() {
    const raceStore = useRaceStore()
    
    const generateProgram = () => {
      raceStore.generateRaceProgram()
    }
    
    const startRaces = () => {
      raceStore.startRaces()
    }
    
    return {
      raceStore,
      generateProgram,
      startRaces
    }
  }
}
</script>