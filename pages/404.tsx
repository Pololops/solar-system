// Description: Homepage - /

import { HeadDocument, MainDocument, FlexBox } from '@/layout';
import { Card, Paragraph } from '@/components';

export default function NoFound() {
  return (
    <>
      <HeadDocument
        titlePage="Le Système Solaire - Erreur 404"
        descriptionPage="Erreur 404 - Page introuvable."
        noIndexPage={true}
      />

      <MainDocument title="Erreur 404">
        <FlexBox>
          <Paragraph>
            Le système solaire est vaste et on s'y perd facilement.
          </Paragraph>
          <Paragraph>
            Surtout ne paniquez pas, et laissez-vous glisser dans ce trou de ver :
          </Paragraph>
        </FlexBox>

        <FlexBox>
          <Card
            cardURL="/"
            cardTitle="Par ici"
            cardLegend="Un raccourci dans l'espace-temps pour retrouvez votre chemin."
          />
        </FlexBox>
      </MainDocument>
    </>
  );
}
