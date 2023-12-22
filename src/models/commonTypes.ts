export interface FilterPayload {
  group: string,
  option: string
}
export interface Payload<T> {
  payload: T
}

export type _t_userCreate= {
  additionalUserInfo: object,
  credential: null | object,
  operationType: string,
  user: object
}
