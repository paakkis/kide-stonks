import axios from 'axios';
import { getRequestId } from '../utils/getRequestId';

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

const fetchUser = async (bearer_token) => {
  try {
    const response = await axios.get(`${baseUrl}/authentication/user`, {
      headers: {
        Authorization: `Bearer ${bearer_token}`
      }
    });
    return response.data
  } catch (error) {
    console.error('Failed to fetch user information:', error);
    return null;
  }
};


const fetchExtraId = async () => {
  try {
    const response = await axios.get('/api/extraid');
    return response.data.extraId;
  } catch (error) {
    console.error('Failed to fetch extraId:', error);
    return null;
  }
};

const fetchTicket = async (id, kideToken, productVariantMaximumReservableQuantity, extraId, proxy) => {
  var data = {
    "expectCart": true,
    "includeDeliveryMethods": false,
    "toCreate":[
      {
        "inventoryId": id,
        "quantity": productVariantMaximumReservableQuantity,
        "productVariantUserForm":null
      }
    ],
    "toCancel": []
  }

  var options = {
    method: 'POST',
    body: data,
    json: true,
    headers: {
        'Authorization': `Bearer ${kideToken}`,
        'X-Requested-Token-C69': getRequestId(id, extraId),
        'X-Requested-With': 'XMLHttpRequest',
       
      }
  }
  if (proxy) {
    const response = await axios.post(`/api/fetchTicket`, data, options, {})
    return response.data
  }
  const response = await axios.post(`${baseUrl}/reservations`, data, options, {})
  return response.data
};

export default { fetchEvents, fetchEvent, fetchTicket, setToken, fetchExtraId, fetchUser }