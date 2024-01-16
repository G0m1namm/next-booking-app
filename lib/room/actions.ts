import { GetRoomResponseType } from "@/backend/controllers/roomControllers"
import { getApiUrl } from "../getBaseUrl"
import { ApiError } from "next/dist/server/api-utils"

export const getRooms = async (): Promise<GetRoomResponseType & Pick<ApiError, 'message'>> => {
    try {
        const res = await fetch(`${getApiUrl()}/rooms`)
        const data = await res.json()
        return data
    } catch (error) {
        return {
            success: false,
            message: 'Failed to retrieve the rooms'
        }
    }
} 