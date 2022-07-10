export const request = async (url: string, options: RequestInit = {}) => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
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
