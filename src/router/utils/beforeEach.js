import { getToken8Store } from "@/utils";

export function beforeEach(to, form, next) {
  const { name, meta } = to;
  if (name == "login") {
    return next();
  }

  // 没有token 跳转到登录页
  if (!getToken8Store()) {
    return next("/login");
  }

  next();
}
