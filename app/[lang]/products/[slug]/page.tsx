import { ProductRoute, productMetadata } from '../../../../components/routes/productRoute'
import { productStaticParams } from '../../../../lib/routes'

export const dynamicParams = false

export const generateStaticParams = productStaticParams('en')

export function generateMetadata({ params }: PageProps<'/[lang]/products/[slug]'>) {
    return productMetadata(params, 'en')
}

export default function Page({ params }: PageProps<'/[lang]/products/[slug]'>) {
    return <ProductRoute params={params} language="en" />
}
