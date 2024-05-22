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
    type: string
    status: TaskStatus
    opprettetTidspunkt: datetime
    triggerTid: datetime
    payload: string
    antallLogger: number
    sistKjørt: datetime
    metadata: {
        callId: string
    }
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
