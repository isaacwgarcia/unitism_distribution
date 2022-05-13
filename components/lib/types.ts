export interface Session {
  jwt: "";
  address: "";
}

export interface FormData {
  form_data: Record<string, string>;
}

export interface Post {
  appId: "";
  createdAt: "";
  id: "";
  metadata: {
    media: [{ original: { url } }];
    description: "";
    content: "" | string;
  };
  profile: {};
  stats: {
    totalAmountOfCollects: number;
    totalAmountOfComments: number;
    totalAmountOfMirrors: number;
  };
}

export interface User {
  bio: "";
  handle: "";
  id: "";
  location: "";
  name: "";
  twitterUrl: "";
  website: "";
  picture: "";
}
