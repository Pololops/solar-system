// Description: Homepage - /

import { HeadDocument, MainDocument } from '@/layout';
import { Card } from '@/components';

export default function Home() {
  return (
    <>
      <HeadDocument
        titlePage="Le Système Solaire"
        descriptionPage="Quels sont les différents objets célestes qui composent notre système solaire"
      />

      <MainDocument title="Notre Système Solaire">
        <div className="center" />
        <div className="flex">
          <Card
            cardURL="/about"
            cardTitle="A propos"
            cardLegend="A propos de notre système solaire."
          />
        </div>
        <div className="flex">
          <Card
            cardURL="/bodies"
            cardTitle="API REST"
            cardLegend="Les objets de notre système solaire."
          />
          <Card
            cardURL="/objects"
            cardTitle="API GraphQL"
            cardLegend="Les objets de notre système solaire."
          />
        </div>
      </MainDocument>
    </>
  );
}
