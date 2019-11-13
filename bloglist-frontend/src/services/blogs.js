import axios from "axios";
const baseUrl = "/api/blogs";
let token = null;
const setToken = t => {
  token = `bearer ${t}`;
  console.log(token);
};
const getAll = async () => {
  console.log("token", token);
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async newObject => {
  const config = { headers: { Authorization: token } };
  const response = await axios.post(baseUrl, newObject, config);

  return response.data;
};

const update = async (blogId, newObject) => {
  const config = { headers: { Authorization: token } };
  const url = `${baseUrl}/${blogId}`;

  const response = await axios.put(url, newObject, config);
  return response.data;
};

const remove = async blogId => {
  const config = { headers: { Authorization: token } };
  const url = `${baseUrl}/${blogId}`;

  const response = await axios.delete(url, config);
  return response.data;
};

export default { getAll, setToken, create, update, remove };
