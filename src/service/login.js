import http from "@/request";

export async function sendCode(mobile) {
  return await http.get("sign/in/verification/code", {
    params: {
      mobile,
    },
  });
}

export async function Login(postData) {
  return await http.post("sign/in/code2session", postData);
}
export async function LoginByMobile(postData) {
  return await http.post("sign/in/check/verification/code", postData);
}
