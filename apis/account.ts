import request from '@/apis/request';

export const getAccountDetail = (id : number) => {
	return request.GET(`/account/${id}`);
};