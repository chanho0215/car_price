import { NextResponse } from "next/server"

const DEFAULT_BACKEND_URL = "http://127.0.0.1:8000"

function getBackendBaseUrl() {
  return (
    process.env.BACKEND_API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    DEFAULT_BACKEND_URL
  )
}

export async function POST(request: Request) {
  try {
    const body = await request.text()
    const backendBaseUrl = getBackendBaseUrl()
    const isLocalBackend = backendBaseUrl === DEFAULT_BACKEND_URL
    const isProduction = process.env.NODE_ENV === "production"

    if (isProduction && isLocalBackend) {
      return NextResponse.json(
        {
          detail:
            "배포 환경의 가격 예측 백엔드가 연결되지 않았습니다. BACKEND_API_URL 환경 변수를 설정해 주세요.",
        },
        { status: 503 },
      )
    }

    const backendUrl = `${backendBaseUrl}/predict`

    const response = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
      cache: "no-store",
    })

    const responseText = await response.text()
    const contentType = response.headers.get("content-type") || ""

    if (!contentType.includes("application/json")) {
      return NextResponse.json(
        {
          detail: `가격 예측 서버가 JSON이 아닌 응답을 반환했습니다. (${response.status})`,
          upstreamStatus: response.status,
        },
        { status: 502 },
      )
    }

    return new NextResponse(responseText, {
      status: response.status,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    })
  } catch (error) {
    const detail =
      error instanceof Error
        ? error.message
        : "백엔드 서버에 연결하지 못했습니다."

    return NextResponse.json(
      { detail: `가격 예측 서버 연결에 실패했습니다. ${detail}`.trim() },
      { status: 502 },
    )
  }
}
