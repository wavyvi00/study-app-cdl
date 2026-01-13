import Head from 'expo-router/head';

interface SeoProps {
    title?: string;
    description?: string;
    image?: string;
}

export default function SEO({
    title = 'CDL Zero: Free CDL Practice Tests 2025',
    description = 'Master your CDL Permit Test with 100% free practice questions. Covers Class A, Class B, Air Brakes, Hazmat, and more.',
    image = '/assets/brand_logo.png'
}: SeoProps) {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:type" content="website" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
        </Head>
    );
}
