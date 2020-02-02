export interface IStats {
    _id?: number;
    refNumber?: string;
    reqSummary?: string;
    reqstate?: string;
    assignedTo?: string;
    application?: string;
    ticketType?: string;
    createDate?: Date;
    closeDate?: Date;
    reqBy?: string;
    priority?: string;
    efforts?: number;
    comments?: string;
    purpose?: string;
}

export interface ILeaves extends Array<string> {
    leaveDate?: Date;
    compOff?: string;
}