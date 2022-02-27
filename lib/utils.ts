import { Timestamp } from 'firebase/firestore'
import { User } from './firebase/firestore'

export const isValidImageUrl = (url?: string): boolean => url && url.match(/\.(jpeg|jpg|gif|png)$/) !== null

export const getAvatarImageUrl = (user: User): string => 
    user && isValidImageUrl(user?.photoURL) ? user?.photoURL : "/hacker.png"

const addZeroPadding = (num: number): string => `${num > 9 ? num : `0${num}`}`

export const toDateTimeString = (dateTime: Timestamp | Date) => {
    let time: Timestamp | Date
    if (dateTime instanceof Timestamp) {
        time = new Date(dateTime.toDate())
    } else {
        time = dateTime
    }
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const year = time.getFullYear();
    const month = months[time.getMonth()];
    const date = time.getDate()
    const hour = addZeroPadding(time.getHours())
    const min = addZeroPadding(time.getMinutes())
    const result = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min;
    return result;
}

export const isEmpty = (obj) => obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype