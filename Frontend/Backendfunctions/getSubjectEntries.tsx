
import axios from "axios";

// Get all entries for a specific subject
export const getSubjectEntries = async (
    setFiles: (files: any[]) => void,
    studentName: string,
    subjectName: string
  ) => {
    try {
      console.log("Fetching entries for", studentName, subjectName, process.env.IP_ADRESS);
      const response = await axios.get(`${process.env.IP_ADRESS}/getfiles/${studentName}/${subjectName}`);
      setFiles(response.data.files);
    } catch (error) {
      console.error("Error fetching backlog entries:", error);
    }
  };