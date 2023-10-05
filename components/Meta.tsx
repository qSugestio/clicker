import { Metadata } from 'next'
import Head from 'next/head'

type Props = {
  title: string
  keywords: string
  description: string
}

export const Meta = ({ title, keywords, description }: Props) => {
  return (
    <Head>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta name='keywords' content={keywords} />
      <meta name='description' content={description} />
      <meta charSet='utf-8' />
      <title>{title}</title>
    </Head>
  )
}

Meta.defaultProps = {
  title: 'Clicker',
  keywords: 'clicker',
  description: 'Clicker',
} as Metadata
