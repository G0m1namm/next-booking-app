import { getBaseUrl } from "@/lib/getBaseUrl";

export default async function Page(props: any) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <pre>{getBaseUrl()}</pre>
      <pre>{process.env.NEXT_PUBLIC_VERCEL_ENV}</pre>
    </main>
  )
}
