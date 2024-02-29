export type Step = {
    label: string
    done: boolean
}

export type Workflow = {
    label: string
    steps: Step[]
}

export type Routine = {
    id: string
    canonicalName: string
    workflows: Workflow[]
}

export type Cache = {
    routines: Routine[]
}
