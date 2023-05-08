const headers = {
  "Content-Type": "application/json",
};

// const baseUrl = "http://localhost:8000/";
// const baseUrl = "http://70.12.246.183:8000";
const baseUrl = "https://k8a305.p.ssafy.io";

interface RequestProps {
  method: string;
  url: string;
  data?: {
    [key: string]: any;
  };
}

const request = async (props: RequestProps) => {
  const { method, data, url } = props;
  const options = {
    method,
    headers,
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(baseUrl + url, options);
    if (!response.ok) {
      throw new Error(`HTTP error!: ${response}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

const requestGet = async (props: RequestProps) => {
  const { method, data, url } = props;
  console.log(data);
  const options = {
    method,
    headers,
  };
  let requestUrl = baseUrl + url;

  if (data && Object.keys(data).length > 0) {
    const searchParams = new URLSearchParams();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        searchParams.set(key, data[key]);
      }
    }
    requestUrl += "?" + searchParams.toString();
    console.log(requestUrl);
  }

  try {
    const response = await fetch(requestUrl, options);
    if (!response.ok) {
      throw new Error(`HTTP error!: ${response}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

export { request, requestGet };
