let IS_CLIENT: boolean = true;

export function setServerCtx() {
  IS_CLIENT = false;
}

export function isClient() {
  return IS_CLIENT;
}
