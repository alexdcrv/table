import request, { IResponse } from '../service'
// import { IAccount } from 'types/account.types'
// import { IProfile } from 'types/profile.types'

export interface IFetchProfileResponseData {
    email: string
    fullname: any
    wins?: Number
    loses?: Number
    _id: string
    isAdmin?: boolean
}

export function fetchProfile() {
    return request<IResponse<IFetchProfileResponseData>>({
        url: `user`
    })
}

export function updateProfile(data: Partial<any>) {
    return request<IResponse<IFetchProfileResponseData>>({
        url: `user`,
        method: 'PUT',
        data
    })
}
