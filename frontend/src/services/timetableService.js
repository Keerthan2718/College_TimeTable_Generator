import api from "./api";

export const createTimetable = async (payload) => {
  const response = await api.post("/timetables/", payload);
  return response.data;
};

export const getAllTimetables = async () => {
  const response = await api.get("/timetables/");
  return response.data;
};

export const getTimetableById = async (id) => {
  const response = await api.get(`/timetables/${id}`);
  return response.data;
};

export const deleteTimetable = async (id) => {
  const response = await api.delete(`/timetables/${id}`);
  return response.data;
};
export const getTimetableDetails = async (id) => {
  const response = await api.get(`/timetables/${id}/details`);
  return response.data;
};

export async function generateTimetable(timetableId) {
    const response = await api.post(
        `/timetables/${timetableId}/generate`
    );

    return response.data;
}