import client from './client';



export const postFile = async (file: { base64File: string; targetId: number }) => {
  try {
    const response = await client.post('files', file);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);

    throw error;
  }
};

export const fetchUserNickname = async () => {
  try {
    const response = await client.get('avatars/3');
    console.log('API response:', response.data);
    return response.data;
  } catch (error) {
    console.log('API error:', error);
    throw error;
  }
};

// export const fetchUserNickname = async () => {
//   const response = await fetch('avatars/3');

//   // Check if response is ok
//   if (!response.ok) {
//     throw new Error('Network response was not ok');
//   }

//   // Check Content-Type header
//   const contentType = response.headers.get('content-type');
//   if (!contentType || !contentType.includes('application/json')) {
//     throw new Error('Received content is not JSON');
//   }

//   // Parse response as JSON
//   const data = await response.json();
//   return data;
// };
