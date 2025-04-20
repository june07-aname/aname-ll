import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('aname', () => ({
    theme: ref('light'),
}),
    {

        persist: {
            debug: false,
        }
    }
)