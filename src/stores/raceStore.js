import { defineStore } from 'pinia'

const horseColors = [
  "#f6c1c1", "#f6eac2", "#c1f6dc", "#d1c1f6", "#f6c1f3",
  "#c1e5f6", "#f6d8c1", "#e0c1f6", "#c1f6e1", "#f2f6c1",
  "#f6cfc1", "#c1f6f4", "#f3c1f6", "#d5f6c1", "#f6c1c9",
  "#c1d7f6", "#f6ecc1", "#c1f6c9", "#f6c1e5", "#e8c1f6"
]

const horseNames = [
  "Trotty Tribbiani", "Gallop Geller", "MoniCanter", "Bing Bang",
  "Hoof Buffay", "Gallop Schrute", "Jim Neighlpert", "Pammarella",
  "Michael Trot", "Canter Kapoor", "Sheldon Steed", "Neighnard Hofstadter",
  "Canter Koothrappali", "Hoofy Wolowitz", "Penny Prancer", "Maxine Mane",
  "Caroline Canters", "Jake Peroltrott", "Rosa Gallidez", "Tahani Trotsani"
]

export const useRaceStore = defineStore('race', {
  state: () => ({
    horses: [],
    raceSchedule: [],
    raceResults: [],
    currentRaceIndex: -1,
    isRacing: false
  }),

  actions: {
    initializeHorses() {
      this.horses = []
      for (let i = 0; i < 20; i++) {
        this.horses.push({
          id: i + 1,
          name: horseNames[i],
          color: horseColors[i],
          condition: Math.floor(Math.random() * 100) + 1
        })
      }
    },

    generateRaceProgram() {
      const distances = [1200, 1400, 1600, 1800, 2000, 2200]
      this.raceSchedule = []
      this.raceResults = []
      
      for (let i = 0; i < 6; i++) {
        // Pick 10 random horses
        const shuffled = [...this.horses].sort(() => Math.random() - 0.5)
        const raceHorses = shuffled.slice(0, 10)
        
        this.raceSchedule.push({
          raceNumber: i + 1,
          distance: distances[i],
          horses: raceHorses
        })
        
        this.raceResults.push({
          raceNumber: i + 1,
          distance: distances[i],
          results: []
        })
      }
    },

    async startRaces() {
      this.isRacing = true
      
      for (let i = 0; i < 6; i++) {
        this.currentRaceIndex = i
        this.runSingleRace(i)
        
        // Wait 5 seconds before next race (except after last race)
        if (i < 5) {
          await new Promise(resolve => setTimeout(resolve, 3000))
        }
      }
      
      this.isRacing = false
      this.currentRaceIndex = -1
    },

    runSingleRace(raceIndex) {
      const race = this.raceSchedule[raceIndex]
      const results = []
      
      race.horses.forEach(horse => {
        const time = Math.random() * 10 + horse.condition / 10
        results.push({
          horse: horse,
          time: time.toFixed(2),
          position: 0
        })
      })
      
      results.sort((a, b) => a.time - b.time)
      results.forEach((result, index) => {
        result.position = index + 1
      })
      
      this.raceResults[raceIndex].results = results
    }
  }
})