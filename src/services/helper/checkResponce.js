const checkResponce = async (responce) => {
  responce.status;

  if (!responce.ok) {
    let data;
    switch (responce.status) {
      case 401:
        data = await responce.json();
        throw new Error(data.message);
      case 403:
        data = await responce.json();
        throw new Error(data.message);
      case 404:
        data = await responce.json();
        throw new Error(data.message);
      case 409:
        data = await responce.json();
        throw new Error(data.message);
      default:
        throw new Error("Error occurred please try again");
    }
  }
  const data = await responce.json();
  if (data.status === "nok") throw new Error(data.message);
  return data.res;
};
export default checkResponce;
