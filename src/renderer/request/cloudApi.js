import { get, post } from './server'

/**
 * 网易云音乐接口
 * cm 是cloudMusic简称
 */

 export const CMSingerArtist = () => get(`/toplist/artist`)