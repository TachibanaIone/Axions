import * as Types from "$lib/types"

export const Utils = {
    /** Find routine by lowercased pathname */
    getRoutine(pathname: string, routines: Types.Routine[]): Types.Routine | undefined {
        const normalizedPathname = pathname.toLowerCase()

        if (routines && routines.length > 0) {
            return routines.find((routine) => routine.id === normalizedPathname)
        }
    },

    sanitizeRoutineName(name: string) {
        return name.replace(/[^a-zA-Z0-9-]/g, "-")
    },

    validateRoutineName(name: string, routines: Types.Routine[]): { formValidationMessage: string; isFormValid: boolean } {
        const reservedWords: string[] = ["api", "auth", "config", "login", "user", "search", "settings", "signup"] as const

        if (name === "") {
            return { formValidationMessage: "New routine name must not be blank.", isFormValid: false }
        }
        const routineID = Utils.sanitizeRoutineName(name).toLowerCase()
        const routineAlreadyExists = Utils.getRoutine(routineID, routines)
        if (routineAlreadyExists) {
            return { formValidationMessage: `The routine ${name} already exists.`, isFormValid: false }
        }
        if (reservedWords.includes(name.toLowerCase())) {
            return { formValidationMessage: `${name} is a reserved word.`, isFormValid: false }
        }
        if (!/^[a-zA-Z0-9-]+$/.test(name)) {
            const sanitizedRoutineName = Utils.sanitizeRoutineName(name)
            return { formValidationMessage: `Your new routine will be created as ${sanitizedRoutineName}.`, isFormValid: true }
        }

        return { formValidationMessage: `${name} is available.`, isFormValid: true }
    },

    onRemoveButtonClick(callback: () => void): number {
        const timeoutID = setTimeout(() => {
            callback()
        }, 1000)

        return timeoutID as unknown as number
    },

    onRemoveButtonLeave(removeButtonTimeoutID: number | null, callback: () => void) {
        if (removeButtonTimeoutID) {
            clearTimeout(removeButtonTimeoutID)
        }
        callback()
    },

    getCurrentLocation(url: URL) {
        const pathnames = url.pathname.split("/")
        return url.pathname.endsWith("/") ? pathnames.slice(-2)[0] : pathnames.slice(-1)[0]
    }
}
