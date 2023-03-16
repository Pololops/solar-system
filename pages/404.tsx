// Description: Homepage - /

import { HeadDocument, MainDocument } from '@/layout';
import { Card } from '@/components';

export default function NoFound() {
  return (
    <>
      <HeadDocument
        titlePage="Le Système Solaire - Erreur 404"
        descriptionPage="Erreur 404 - Page introuvable."
        noIndexPage={true}
      />

      <MainDocument title="Erreur 404">
        <div className="flex">
          <p>Le système solaire est vaste et on s'y perd facilement.</p>
          <p>
            Surtout ne paniquez pas, et laissez-vous glisser dans ce trou de ver
            :
          </p>
        </div>

        <div className="flex">
          <Card
            cardURL="/"
            cardTitle="Par ici"
            cardLegend="Un raccourci dans l'espace-temps pour retrouvez votre chemin."
          />
        </div>
      </MainDocument>
    </>
  );
}
