type EndpointType = {
  [key: string]: {
    [key: string]: string;
  };
};

export const endpoints: EndpointType = {
  staff: {
    login: '/login',
  },
};
