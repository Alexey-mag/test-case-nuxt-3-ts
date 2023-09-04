import { IUser } from "~/interfaces/IUser";

export function useUsers() {
    const users = ref<Array<IUser>>([])

    function addUser(user: IUser): void {
        user.id = Math.floor((Math.random() * 1000000) + 1)
        users.value.push(user)
    }

    function updateUser(changedUser: IUser): void {
        users.value.forEach(user => {
            if (user.id === changedUser.id) {
                Object.assign(user, changedUser)
            }
        })
        
    }

    function remove(idx: number): void {
        users.value.splice(idx, 1)
    }

    return { users, remove, addUser, updateUser }
}