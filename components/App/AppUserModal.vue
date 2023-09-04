<template>
    <div v-if="modal.model" class="fixed top-0 bottom-0 left-0 h-screen w-screen flex items-center justify-center z-30 bg-black bg-opacity-50">
        <div v-if="user" class="relative flex flex-col gap-4 bg-white shadow-md rounded px-8 pt-6 pb-8" :class="$style.container">
            <span class="absolute top-0 right-0 cursor-pointer" @click="modal.toggleModel()">
                <i-close />
            </span>
            <div>
                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                    Имя
                </label>
                <input
                v-model="user.firstName"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                type="text"
                >
            </div>

            <div>
                <input 
                v-model="user.level" 
                type="radio" 
                name="position" 
                value="worker" 
                class="mr-2 w-4 h-4"
                :disabled="mode == 'edit'"
                />
                <label for="surnames">Работник</label>
            </div>
            <div>
                <input 
                type="radio" 
                name="position" 
                value="boss" 
                v-model="user.level" 
                class="mr-2 w-4 h-4" 
                :disabled="mode == 'edit'"
                />
                <label for="surnames">Начальник</label>
            </div>

            <div>
                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                    Фамилия
                </label>
                <input
                    v-model="user.lastName"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    type="text"
                >
            </div>
            <div v-if="user.level === 'boss'">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                    Телефон
                </label>
                <input
                v-model="user.phone"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                type="text"
                >
            </div>
            <div class="w-full h-full flex grow justify-end items-end">
                <button 
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" 
                @click="save"
            >
            {{ mode == 'edit' ? 'Редактировать' : 'Создать' }}
            </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { IUser } from '~/interfaces/IUser'

const emit = defineEmits<{
  (e: 'changeUsers', value: IUser): void
}>()

const onUpdate = () => emit('changeUsers', user.value)

const currentUser = inject<IUser>('user')
const mode = inject<'create' | 'edit'>('mode')

const modal = useModal()
const { user, setUser } = useUser()

watch(currentUser, (value) => {
    setUser({ ...value })
})

const save = () => {
    onUpdate()
    modal.model = false
}
</script>

<style module>
.container {
    min-height: 450px;
}
</style>