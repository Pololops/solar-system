// Description: About page - /about

import { HeadDocument, MainDocument, DescriptionBox } from '@/layout';
import { Paragraph } from '@/components';
import CenterBox from '../layout/CenterBox/index';

export default function About() {
  return (
    <>
      <HeadDocument
        titlePage="Le systèpme solaire - A propos"
        descriptionPage="Quels sont les différents objets célestes qui composent notre système solaire - A propos de ce site"
      />

      <MainDocument title="A propos">
        <CenterBox />
        <DescriptionBox>
          <Paragraph>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est
            molestiae veniam cum facere? Aut excepturi maiores ipsa suscipit
            placeat similique esse alias corporis dolor ab natus harum ratione,
            unde quos.
          </Paragraph>
          <Paragraph>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam esse
            iure fugit quasi praesentium doloremque quod nostrum illum rerum
            dolorum laborum, eum amet consectetur culpa dolore accusamus
            consequuntur iste tempore.
          </Paragraph>
        </DescriptionBox>
      </MainDocument>
    </>
  );
}
