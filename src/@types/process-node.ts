export type ProcessNode = {
    id: number,
    name: string,
    state: 1 | 2 | 3 | 4 | 5,
    dueDate: null,
    isFinal: false,
    isAutomatic: false,
    disabled: false,
    isExpired: false,
    executorName: string,
    weight: number,
    rowNumber: number,
    index: number,
    dependencies: {
        count: number,
        nodes: Array<number>
    },
    hasInlines: boolean,
    hasOutlines: boolean,
}