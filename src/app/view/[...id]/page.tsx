import { Metadata } from "next"
import { getResult } from "@/actions/result"

import { Footer } from "@/app/components/view/footer"

import { Result } from "./_components/result"

type IdPageProps = {
  params: Promise<{ id: string[] }>
}

export async function generateMetadata({
  params,
}: IdPageProps): Promise<Metadata> {
  const id = (await params).id
  const data = await getResult(id[0])

  return {
    title: data.length > 0 ? data[0].address : "",
    description: data.length > 0 ? data[0].text : "",
  }
}

export default async function IdPage({ params }: IdPageProps) {
  const id = (await params).id

  const data = await getResult(id[0])
  return (
    <>
      <Result text={data.length > 0 ? data[0].text : undefined} />
      <Footer address={data.length > 0 ? data[0].address : undefined} />
    </>
  )
}
