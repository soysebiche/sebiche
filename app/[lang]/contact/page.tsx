import { ContactRoute, contactMetadata } from '../../../components/routes/contactRoute'

export function generateMetadata({ params }: PageProps<'/[lang]/contact'>) {
    return contactMetadata(params, 'en')
}

export default function Page({ params }: PageProps<'/[lang]/contact'>) {
    return <ContactRoute params={params} language="en" />
}
