export interface IAxiosError {
    response: {
        data: {
            message: string;
            name: string;
            stack: string;
            code: string;
            status: number;
        }
    }
}
