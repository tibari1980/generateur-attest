import Hero from "@/components/Hero";
import Features from "@/components/Features";
import SocialProof from "@/components/SocialProof";
import CallToAction from "@/components/CallToAction";
import AttestationGenerator from "@/components/AttestationGenerator";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <SocialProof />
      <CallToAction />

      <div id="generate" style={{
        width: '100%',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      }}>
        <AttestationGenerator />
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "JL Cloud",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "EUR"
            },
            "description": "Générez vos attestations et documents administratifs en quelques secondes.",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "ratingCount": "150"
            }
          })
        }}
      />
    </>
  );
}

