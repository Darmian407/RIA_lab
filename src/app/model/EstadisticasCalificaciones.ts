export interface EstadisticasCalificaciones {
    labels: string[],
    datasets: DataSet[]
}

export interface DataSet {
    id?: number,
    label?: string,
    backgroundColor: string,
    data: number[]
}