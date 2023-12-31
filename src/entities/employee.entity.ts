export class Employee {
  _id: number;
  detail: {
    name: string
    joining: Date
    end: Date
    nik: string
    npwp: string
    placeOfBirth: string
    dateOfBirth: Date
    gender: "Pria" | "Wanita"
    bloodType: "A" | "B" | "AB" | "O"
    religion: "Islam" | "Kristen" | "Hindu" | "Buddha" | "Kong Hu Chu" | "Lainnya"
    latestEducation: "SD" | "SMP" | "SMA/SMK" | "Sarjana" | "Magister" | "Doktor"
    yearOfGraduation: number
  };
  contactAndAddress: {
    phoneNumber: string
    email: string
    emergencyContact: {
      name: string
      phoneNumber: string
    }
    address: string
    kelurahan: string
    kecamatan: string
    city: string
    province: string
    zipCode: string
  };
  family: {
    maritalStatus: "Single" | "Married" | "Divorce"
    spouse: {
      name: string
      phoneNumber: string
      address: string
    }
    mother: {
      name: string
      phoneNumber: string
      address: string
    }
    father: {
      name: string
      phoneNumber: string
      address: string
    }
    siblings: {
      name: string
      phoneNumber: string
      address: string
    }[]
    tanggungan: unknown
  };
  leave: {
    totalLeaves: number
  };
  deletedAt: Date;
}