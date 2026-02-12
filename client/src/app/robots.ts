import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://jl-cloud.com'; // Remplacez par votre domaine réel

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin/', '/private/'], // Bloquer l'accès aux pages admin
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
