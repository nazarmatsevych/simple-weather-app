export const getUserCity = async () => {
  const response = await fetch('https://ipapi.co/json/');
  const data = await response.json();
  return data.city;
};
