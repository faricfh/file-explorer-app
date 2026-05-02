import type { ApiError, ApiResponse } from '@/types/api.type'

const BASE_URL = import.meta.env.VITE_API_URL

const request = async <T>(path: string, options?: RequestInit): Promise<ApiResponse<T>> => {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  const json = await response.json()

  if (!response.ok) {
    throw json as ApiError
  }

  return json as ApiResponse<T>
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: 'POST', body: JSON.stringify(body) }),
  put: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: 'PUT', body: JSON.stringify(body) }),
  patch: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: 'PATCH', body: JSON.stringify(body) }),
  delete: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
}
