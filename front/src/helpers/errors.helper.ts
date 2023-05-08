import axios from 'axios';

export function getAxiosErrorMessage(error: unknown): string | void {
    return (axios.isAxiosError(error) && error.response?.data?.message) || undefined;
}
