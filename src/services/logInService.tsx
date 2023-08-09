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
    const data = await response.json();

    if (response.ok) {
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
