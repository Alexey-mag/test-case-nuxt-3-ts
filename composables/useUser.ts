import { IUser } from "~/interfaces/IUser"

export function useUser(): any {
    const user = ref<IUser | null>(null)

    function setUser(newUser: IUser) {
        user.value = newUser
    }

    return { user, setUser }
}