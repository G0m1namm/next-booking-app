export const getRooms = async () => {
    try {
        const apiUrl = process.env.VERCEL_URL;
        console.log(apiUrl);

        return true
    } catch (error) {
        return {
            message: 'Failed to retrieve the rooms'
        }
    }
} 