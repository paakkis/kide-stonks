import axios from 'axios';
import { useState, useEffect } from 'react'

const baseUrl = 'https://api.kide.app/api'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const fetchEvents = async (city) => {
    const response = await axios.get(`${baseUrl}/products?city=${city}`)
    return response.data
}

const fetchEvent = async (id) => {
    const response = await axios.get(`${baseUrl}/products/${id}`)
    return response.data
}

const fetchTicket = async (id, kideToken) => {

  var data = {"toCreate":[{"inventoryId":id,"quantity":1,"productVariantUserForm":null}]}

  var options = {
  method: 'POST',
  body: data,
  json: true,
  headers: {
      'Authorization': `Bearer ${kideToken}`
    }
  }
  const response = await axios.post(`${baseUrl}/reservations`, data, options, {})
  console.log(response.data)
  return response.data
}

export default { fetchEvents, fetchEvent, fetchTicket, setToken }