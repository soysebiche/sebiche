import { ContactRoute, contactMetadata } from '../../../components/routes/contactRoute'

export function generateMetadata({ params }: PageProps<'/[lang]/contacto'>) {
    return contactMetadata(params, 'es')
}

export default function Page({ params }: PageProps<'/[lang]/contacto'>) {
    return <ContactRoute params={params} language="es" />
}
