import { IModalState } from "~/interfaces/IModal"



export const useModal = defineStore('modal',{
    state: () => ({
        model: false,
    } as IModalState),

    getters: {
    },

    actions: {
        toggleModel(): void {
            this.model = !this.model
        }
    }
})