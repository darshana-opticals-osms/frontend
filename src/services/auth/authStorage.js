const TOKEN_KEY = 'osms.auth.token';
const USER_KEY = 'osms.auth.user';

function saveAuth(token, user) {
  if (!token || !user) {
    return;
  }

  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

function getUser() {
  const storedUser = localStorage.getItem(USER_KEY);

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser);
  } catch {
    localStorage.removeItem(USER_KEY);
    return null;
  }
}

function clearAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

const authStorage = {
  saveAuth,
  getToken,
  getUser,
  clearAuth,
};

export default authStorage;
