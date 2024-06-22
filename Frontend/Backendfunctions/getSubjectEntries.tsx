
import axios from "axios";

// Get all entries for a specific subject
export const getSubjectEntries = async (
    setFiles: (files: any[]) => void,
    studentName: string,
    subjectName: string
  ) => {
    try {
      const response = await axios.get(`http://192.168.119.190:8000/getfiles/${studentName}/${subjectName}`);
      setFiles(response.data.files);
    } catch (error) {
      console.error("Error fetching backlog entries:", error);
    }
  };