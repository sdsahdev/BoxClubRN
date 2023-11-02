// import React, { useState, useEffect } from 'react';
// import { bASE_URL } from './Urls';

// // Define a function for making API calls
// async function makeApiCall(endpoint, method = 'GET', params = {}, headers = {}) {
//     const apiUrl = `${bASE_URL}${endpoint}`;

//     const config = {
//         method,
//         headers: {
//             'Content-Type': 'application/json',
//             ...headers,
//         },
//     };

//     if (method === 'GET') {
//         // Add query parameters to the URL for GET requests
//         const queryString = new URLSearchParams(params).toString();
//         apiUrl = `${apiUrl}?${queryString}`;
//     } else {
//         // For other request methods (POST, PUT, etc.), include the body
//         config.body = JSON.stringify(params);
//     }

//     try {
//         const response = await fetch(apiUrl, config);
//         if (!response.ok) {
//             throw new Error(`Request failed with status ${response.status}`);
//         }
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         throw new Error(`API call error: ${error.message}`);
//     }
// }
