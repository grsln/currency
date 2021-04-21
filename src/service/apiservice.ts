const API_URL = "https://www.cbr-xml-daily.ru/daily_json.js";

class ApiService {
  request() {
    const data = fetch(API_URL).then((res) => res.json());
    return data;
  }
}

export default new ApiService();
