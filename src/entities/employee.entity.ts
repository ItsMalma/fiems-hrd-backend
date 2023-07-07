export class Employee {
  _id: number
  detail: {
    name: string
    joining: Date
    end: Date | null
    nik: string
    npwp: string | null
    placeOfBirth: string
    dateOfBirth: Date
    gender: "Pria" | "Wanita"
    bloodType: "A" | "B" | "AB" | "O"
    religion: "Islam" | "Kristen" | "Hindu" | "Buddha" | "Kong Hu Chu" | "Lainnya"
    latestEducation: "SD" | "SMP" | "SMA/SMK" | "Sarjana" | "Magister" | "Doktor"
    yearOfGraduation: number
  }
  contactAndAddress: {
    phoneNumber: string
    email: string
    emergencyContact: {
      name: string
      phoneNumber: string
    } | null
    address: string
    kelurahan: string
    kecamatan: string
    city: string
    province: string
    zipCode: string
  }
  family: {
    maritalStatus: "Single" | "Married" | "Divorce"
    spouse: {
      name: string
      phoneNumber: string
      address: string
    } | null
    mother: {
      name: string
      phoneNumber: string | null
      address: string
    }
    father: {
      name: string
      phoneNumber: string | null
      address: string
    }
    siblings: {
      name: string
      phoneNumber: string | null
      address: string
    }[]
    tanggungan: unknown
  }
  leave: {
    totalLeaves: number
  }
}