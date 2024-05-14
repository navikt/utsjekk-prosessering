type datetime = string

declare type TaskStatus =
    | 'UBEHANDLET'
    | 'AVVIKSHÅNDTERT'
    | 'BEHANDLER'
    | 'FEILET'
    | 'FERDIG'
    | 'KLAR_TIL_PLUKK'
    | 'MANUELL_OPPFØLGING'
    | 'PLUKKET'

declare type Task = {
    id: number
    status: TaskStatus
    opprettetTidspunkt: datetime
    triggerTid: datetime
    taskStepType: string
    payload: string
    antallLogger: number
    sistKjørt: datetime
    callId: string
}

declare type TaskLog = {
    id: number
    endretAv: string
    type: TaskStatus
    node: string
    melding?: null | string
    opprettetTidspunkt: datetime
}

declare type SearchParams = { [key: string]: string | undefined }
