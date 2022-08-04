export const request = async (url: string, options: RequestInit = {}) => {
  try {
    const response = await fetch(url, {
      ...options,
      // mode: 'cors',
      // credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `${document.cookie.split('token=')[1]}`,
      },
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw data;
    }
  } catch (e) {
    console.error(e);
    alert(e.message);
  }
};
