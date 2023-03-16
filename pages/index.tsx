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
          <Card
            cardURL="/bodies"
            cardTitle="Les objets"
            cardLegend="Les objets de notre système solaire."
          />
        </div>
      </MainDocument>
    </>
  );
}
