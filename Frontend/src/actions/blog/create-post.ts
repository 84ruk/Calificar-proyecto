'use server';
import { cookies } from 'next/headers';

export const createBlogPost = async (data) => {
  try {

    const cookieStore = cookies();
    const cookieValue = cookieStore?.get('token');

    const { value } = cookieValue;

    const response = await fetch('http://localhost:3001/posts', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${value}`,
       },
      
      body: JSON.stringify(data),
    });



    return await response.json();
  } catch (error) {
    console.error('Error creating blog post:', error);
    throw new Error('Error creating blog post');
  }
};
