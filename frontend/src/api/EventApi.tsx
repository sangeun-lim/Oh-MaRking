import axios from 'axios';
import Url from './Url';

const EventApi = {
  event: {
    readAll: async () => {
      const response = await axios({
        url: Url.event.readEvent(),
        method: 'get',
      });
      return response;
    },
  },
};

export default EventApi;
