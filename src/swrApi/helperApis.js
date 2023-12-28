import { axiosInstance } from "./axiosIntercept";

export const expressLogin = async (token) => {
   try {
      const resp = await axiosInstance.get('/login', {
         headers: {
            'Authorization': `${token}`
         }
      })
      // console.log('express-', resp.data)
   } catch (err) {
      console.log(err)
      throw new Error('Failed')
   }

}
export const expressLogout = async () => {
   try {
      const resp = await axiosInstance.get('/logout')
      // console.log('express-', resp.data)
   } catch (err) {
      console.log(err)
      throw new Error('Failed')
   }

}

export const getPeopleData = async ({ args }) => {
   try {
      const response = await axiosInstance.get('/getpeople', {
         params: { action: 'getPeopleData', search_reg: args }


      })
      // console.log(response.data)
      return response.data
   } catch (err) {
      console.log(err)
      throw new Error('Failed')
   }

}
export const getPersonData = async ({ args }) => {
   try {
      const response = await axiosInstance.get('/getperson', {
         params : {search_reg: args.Region,id:args.id}
         // params: { action: 'getPersonData', search_reg: args.Region, Name: args.Name, Address: args.Address, Region: args.Region }
      })
      // console.log(response.data)
      return response.data
   } catch (err) {
      console.log(err)
      throw new Error('Failed')
   }
   // console.log(args)


}
export const addItem = async (args) => {
   try {       //post
      const response = await axiosInstance.get('/addperson',{
         params: {
            search_reg: args.Region, Name: args.Name, Address: args.Address,
            Region: args.Region, WhatsApp: args.WhatsApp, Rate1: args.Rate1
            , Rate2: args.Rate2, etDueDateRate1: args.etDueDateRate1, etDueDateRate2: args.etDueDateRate2, SlNo: args.SlNo, HouseNo: args.HouseNo
         }
      })
      return response.data
   } catch (err) {
      console.log(err)
      throw new Error('Failed')

   }
}
export const updateItem = async (args) => {
   // console.log(args)
   try {
      const response = await axiosInstance.get('/updateperson',{
         params: {
             search_reg: args.Region, Name: args.Name, Address: args.Address,
            Region: args.Region, WhatsApp: args.WhatsApp, Rate1: args.Rate1
            , Rate2: args.Rate2, etDueDateRate1: args.etDueDateRate1, etDueDateRate2: args.etDueDateRate2, SlNo: args.SlNo, HouseNo: args.HouseNo,
            etURemarks: args.etURemarks,id:args.id
         }
      })
      return response.data
   } catch (err) {
      console.log(err)
      throw new Error('Failed')

   }
   //params: { ...args, action: 'addItem', search_reg: args.Region },

}
export const expense = async (args) => {
   try {//post
      const response = await axiosInstance.get('/credit',{
         params: {
             etCreditPart: args.etCreditPart, etCreditAmount: args.etCreditAmount,
            etCreditBill: args.etCreditBill, etCreditDate: args.etCreditDate, ledgerName: args.ledgerName
         }
      })
      return response.data
   } catch (err) {
      console.log(err)
      throw new Error('Failed')
   }
}
export const income = async (args) => {
   try { ///post
      const response = await axiosInstance.get('/debit',{
         params: {
            etDebitPart: args.etCreditPart, etDebitAmount: args.etCreditAmount,
            etDebitBill: args.etCreditBill, etDebitDate: args.etCreditDate, ledgerName: args.ledgerName
         }
      })
      return response.data
   } catch (err) {
      console.log(err)
      throw new Error('Failed')
   }

}

export const generateBill = async ({ args }) => {
   try {
      // console.log(args)
      const response = await axiosInstance.get('/getbilldata',{
         params: {
            action: 'generateBill', ledgerName: args.ledgerName, etBilFromDate: args.etBilFromDate, etBilToDate: args.etBilToDate
         }

      })
         // console.log(response.data)
      if (response.data.items) {
         return response.data
      } else {
         throw new Error("failed")
      }


   } catch (error) {
      throw error
   }

}

export const confirmPay = async (args) => {
   try {
      // console.log(args)
      const response = await axiosInstance.get('/paynow',{
         params: { ...args, action: 'payFee' }

      })


      // console.log(response.data)
      return response.data
   } catch (error) {
      throw new Error("failed")
   }
}
export const updateSheet = async (args) => {
   try {
      // console.log(args)
      const response = await axiosInstance.get('/updatesheet',{
         params: { ...args}

      })
      return response.status
   } catch (error) {
      console.log('message ',error.response.status)
      throw new Error ('Failed')
   }
}