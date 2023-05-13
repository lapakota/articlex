import { UploadedPhoto } from '../../contracts';
import { axiosBasic } from '../../interceptors';

export const PhotosService = {
    async uploadPhoto(photo: File) {
        return axiosBasic.post<UploadedPhoto>('photos/upload', { photo });
    },
};
