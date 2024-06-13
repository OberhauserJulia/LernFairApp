



  export interface File {
    _id: { $oid: string };
    file_id: string;
    name: string;
    topic?: string;
    subject?: string;
    documentname: string;
  }