import axios, {AxiosRequestConfig, AxiosResponse} from "axios";

async function fetchData(prompt: string) {
  const headers: AxiosRequestConfig["headers"] = {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTEzMzgzODUsImV4cCI6MTY5MTM0MTk4NX0.xQZXsnyDktEkdWrmSyS1HxguOnSsqxHWVuGx595Yppo",
  };

  const requestOptions: AxiosRequestConfig = {
    method: "POST",
    headers: headers,
    data: {
      prompt,
    },
    url: "http://localhost:3000/openai",
    responseType: "text", // specify the response type
    maxRedirects: 5, // specify the maximum number of redirects to follow
  };

  try {
    console.log("requestOptions", requestOptions);

    const response: AxiosResponse = await axios(requestOptions);

    console.log("response", response);
    const result: string = response.data;
    return JSON.parse(result);
  } catch (error) {
    //    console.error("Error:", error);
    return null;
  }
}

export default fetchData;