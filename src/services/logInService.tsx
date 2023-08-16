import axios, {AxiosRequestConfig, AxiosResponse} from "axios";

export const login = async (
  email: string,
  password: string
): Promise<string | null> => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    email,
    password,
  });

  const requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      "http://localhost:3000/user/login",
      requestOptions
    );
    localStorage.removeItem("AUTH_KEY");
    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("AUTH_KEY", data.token);
      return data.token;
    } else {
      console.log("Login failed:", data.error);
      return null;
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return null;
  }
};

export const expired = async (authKey: string) => {
  const myHeaders: AxiosRequestConfig["headers"] = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authKey}`,
  };

  const requestOptions: AxiosRequestConfig = {
    method: "GET",
    headers: myHeaders,
    // Axios does not have a 'redirect' property. It follows redirects automatically.
  };

  try {
    const response = await axios.get(
      "http://localhost:3000/validate",
      requestOptions
    );
    return response.data.success;
  } catch (error) {
    return error;
  }
};
