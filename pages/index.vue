<template>
    <div class="flex flex-col gap-4">
        <div class="flex gap-4 items-center">
            <button 
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" 
                @click="add"
            >
            Добавить пользователя
            </button>
            <div>
                <input type="checkbox" name="surnames" v-model="showSurnames" class="mr-2 w-4 h-4" />
                <label for="surnames">Показывать фамилии</label>
            </div>
            <nuxt-link 
                to="/textarea" 
                tag="button" 
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" 
                >Textarea
            </nuxt-link>
        </div>
        <div v-if="users.length" class="flex flex-col gap-4 bg-white shadow-md rounded p-4 mb-4 overflow-y-auto user-container">
            <div v-for="(user, idx) in users" :key="idx" class="flex justify-between w-full p-2 user-container_row">
                <div class="flex items-center gap-4">
                    <span class="row_block">{{ user.firstName }}</span>
                    <span class="row_block">{{ showSurnames? user.lastName : '' }}</span>
                    <span class="row_block" v-if="user.phone">{{ user.phone }}</span>
                </div>
                <div class="flex gap-4">
                    <span class="cursor-pointer" @click="edit(user)">
                        <i-edit />
                    </span>
                    <span class="cursor-pointer" @click="remove(idx)">
                        <i-delete />
                    </span>
                </div>
            </div>
        </div>

        <app-user-modal @change-users="changeUsers" />
    </div>
</template>

<script setup lang="ts">
import { useModal } from "../stores/modal.js"
import { IUser } from '../interfaces/IUser'

type modalMode = 'edit' | 'create'

const initUser: IUser = {
    id: null,
    firstName: '',
    lastName: '',
    level: 'worker',
    phone: ''
}

const modal = useModal()
const { user, setUser } = useUser()

const showSurnames = ref<Boolean>(true)
const mode = ref<modalMode>('create')
const { users, remove, updateUser, addUser } = useUsers()

const edit = (newUser: IUser) => {
    setUser(newUser)
    mode.value = 'edit'
    modal.toggleModel()
}

const add = () => {
    mode.value = 'create'
    setUser({ ...initUser })
    modal.toggleModel()
}

const changeUsers = (user: IUser) => {
    if (mode.value == 'create') {
        addUser(user)
    } else {
        updateUser(user)
    }
}

provide('user', user)
provide('mode', mode)
</script>

<style scoped>
.user-container {
    max-height: 600px;
}
.user-container_row {
    background-color: #edf2f7;
}
.row_block {
    min-width: 250px;
}
</style>