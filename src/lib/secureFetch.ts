const API = 'http://localhost:3000';

export async function secureFetch(input: RequestInfo, init?: RequestInit): Promise<Response> {
  let res = await fetch(`${API}${input}`, {
    ...init,
    credentials: 'include',
  });

  if (res.status === 401) {
    // Token süresi dolmuş olabilir → refresh dene
    const refresh = await fetch(`${API}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!refresh.ok) {
      // Refresh başarısız → login'e at
      window.location.href = '/login';
      return res;
    }

    // Token yenilendiyse → isteği tekrar dene
    res = await fetch(`${API}${input}`, {
      ...init,
      credentials: 'include',
    });
  }

  return res;
}
