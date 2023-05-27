export type { default as ILoginForm } from "./auth/login/ILoginForm";
export type { default as IRegisterForm } from "./auth/register/IRegisterForm";

// enum can also be used as a value, so we can not store it in a
//  .d.ts file. We need to store it in a .ts file and export it as a value.
export { default as EAvatar } from "./icons/EAvatar";

export { default as ELink } from "./nav-links/ELink";
