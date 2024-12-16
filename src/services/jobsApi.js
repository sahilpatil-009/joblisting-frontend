const URL = "https://joblisting-server-1ujf.onrender.com";

export const getJobs = ({limit, offset, jobPosition, skills}) => {
  return fetch(`${URL}/job?limit=${limit}&offset=${offset}&jobPosition=${jobPosition}&skills=${skills}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const AddnewJob = (data) => {
  return fetch(`${URL}/job`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  });
};

export const getSpecificJob = (id) => {
  return fetch(`${URL}/job/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const updateJob = (id, data) => {
  return fetch(`${URL}/job/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },

    body: JSON.stringify(data),
  });
};

export const deleteJob = (id) => {
  return fetch(`${URL}/job/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
  });
};
