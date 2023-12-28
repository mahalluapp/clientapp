import { axiosInstance } from "./axiosIntercept";

export const createSheet = async (args) => {
    try {
        const response = await axiosInstance.get('/createSheet', {
            params: args
        })
        // console.log(response.data)
        return response.data
    } catch (err) {
        console.log(err)
        throw err
    }

}

export const getSheetList = async (args) => {
    try {
        const response = await axiosInstance.get('/getsheetlist')
        // console.log(response.data)
        return response.data
    } catch (err) {
        console.log(err)
        throw err
    }
}
export const addSheetContent = async (args) => {
    try {
        const response = await axiosInstance.get('/addsheetcontent', {
            params: args
        })
        // console.log(response.data)
        return response.data
    } catch (err) {
        console.log(err)
        throw err
    }
}
export const updateMisc = async (args) => {
    // console.log(args)
    try {
        const response = await axiosInstance.get('/updatemisc', {
            params: args
        })
        console.log(response.data)
        return response.status
    } catch (err) {
        console.log(err)
        throw err
    }
}
export const viewSheet = async ({ args }) => {
    try {
        const response = await axiosInstance.get('/viewsheet', {
            params: { sheetName: args }
        })
        // console.log(response.data)
        return response.data
    } catch (err) {
        console.log(err)
        throw err
    }
};
export const deleteSheet = async (args) => {
    try {
        const response = await axiosInstance.get('/deletesheet', {
            params: args
        })
        // console.log(response.data)
        return response.data
    } catch (err) {
        console.log(err)
        throw err
    }

}