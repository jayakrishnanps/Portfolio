export interface ContactInfo {
  name: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  location: string;
}

export const contact: ContactInfo = {
  name: "Jayakrishnan P S",
  phone: "+91 8921936152",
  email: "jayakrishnanps12@gmail.com",
  linkedin: "https://linkedin.com/in/jayakrishnan-ps-6a23872a1",
  github: "https://github.com/jayakrishnanps",
  location: "Kerala, India",
} as const;
