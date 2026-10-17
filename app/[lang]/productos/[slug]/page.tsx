import { ProductRoute, productMetadata } from '../../../../components/routes/productRoute'
import { productStaticParams } from '../../../../lib/routes'

export const dynamicParams = false

export const generateStaticParams = productStaticParams('es')

export function generateMetadata({ params }: PageProps<'/[lang]/productos/[slug]'>) {
    return productMetadata(params, 'es')
}

export default function Page({ params }: PageProps<'/[lang]/productos/[slug]'>) {
    return <ProductRoute params={params} language="es" />
}
