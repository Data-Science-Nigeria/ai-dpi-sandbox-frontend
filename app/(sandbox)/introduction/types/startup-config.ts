export interface Startup {
  id: number;
  email: string;
  username: string;
  serviceCode: string;
  name: string;
}

// Mapping for USSD endpoint names that differ from usernames
const ussdEndpointMapping: Record<string, string> = {
  myitura: "myltura",
  uhctech: "uhc_tech",
  xchangebox: "xbox",
};

export const startups: Startup[] = [
  {
    id: 15,
    email: "lekan@alajo.app",
    username: "alajo",
    serviceCode: "",
    name: "Alajo",
  },
  {
    id: 9,
    email: "dev@clafiya.com",
    username: "clafiya",
    serviceCode: "*347*579#",
    name: "Clafiya",
  },
  {
    id: 14,
    email: "agrocistapp@gmail.com",
    username: "evet",
    serviceCode: "*347*754#",
    name: "Evet",
  },
  {
    id: 8,
    email: "ken@fertitude.co",
    username: "fertitude",
    serviceCode: "*347*497#",
    name: "Fertitude",
  },
  {
    id: 10,
    email: "osamede@flolog.co",
    username: "flolog",
    serviceCode: "*347*463#",
    name: "FlologPharma",
  },
  {
    id: 13,
    email: "engineering@xchangebox.ng",
    username: "xchangebox",
    serviceCode: "*347*395#",
    name: "Xchangebox",
  },
  {
    id: 17,
    email: "shina@myitura.com",
    username: "myitura",
    serviceCode: "*347*428#",
    name: "MyItura",
  },
  {
    id: 16,
    email: "ibukun@8medical.co",
    username: "8medical",
    serviceCode: "*347*269#",
    name: "8Medical",
  },
  {
    id: 11,
    email: "tomisintomori@gmail.com",
    username: "uhctech",
    serviceCode: "*347*852#",
    name: "UHCTech",
  },
];

export const defaultStartup = startups.find((s) => s.username === "fertitude")!;

export function getStartupByUser(
  userId?: number,
  email?: string,
  username?: string
): Startup {
  const startup = startups.find(
    (s) => s.id === userId || s.email === email || s.username === username
  );
  return startup || defaultStartup;
}

export function getUssdEndpointName(username: string): string {
  return ussdEndpointMapping[username] || username;
}
