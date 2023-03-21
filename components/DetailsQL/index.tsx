import Link from 'next/link';

type PropsType = {
  body: SolarSystemObject;
};

export default function Card({ body }: PropsType) {
  const getType = () => {
    if (typeof body === 'string') return null;
    switch (body.bodyType) {
      case 'Planet':
        return 'Planète';
      case 'Moon':
        return 'Satellite';
      case 'Dwarf Planet':
        return 'Planète naine';
      case 'Star':
        return 'Étoile';
      case 'Asteroid':
        return 'Astéroïde';
      case 'Comet':
        return 'Comète';
      default:
        return null;
    }
  };

  const getDiscoveryDate = () => {
    const date = typeof body !== 'string' && body.discoveryDate;
    if (!date || typeof date !== 'string') return null;
    const formatDate = new Date(date);
    return formatDate
      .toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
      .replace(' 1 ', ' 1er ');
  };

  return (
    <>
      {body.bodyType && <p>Type : {getType()}</p>}

      {body.isPlanet && body.moons && (
        <p>
          Satellite(s) :{' '}
          {body.moons.length === 0
            ? ' Aucun'
            : body.moons.map((moon, index, array) => 
                'id' in moon && (
                  <>
                    <Link key={moon.id} href={`${encodeURIComponent(moon.id)}`}>
                      {moon.name}
                    </Link>
                    {index !== array.length - 1 && ' - '}
                  </>
                )
              )
          }
        </p>
      )}

      {body.aroundPlanet && 'id' in body.aroundPlanet && (
        <p>
          Planète proche :{' '}
          <Link href={`${encodeURIComponent(body.aroundPlanet.id)}`}>
            {body.aroundPlanet.name}
          </Link>
        </p>
      )}

      {!!body.density && <p>{`Densité : ${body.density}`}</p>}

      {!!body.gravity && <p>{`Gravité : ${body.gravity}`}</p>}

      {!!body.dimension && <p>{`Dimension : ${body.dimension}`}</p>}

      {body.discoveryDate && <p>{`Découvert le : ${getDiscoveryDate()}`}</p>}
      
      {body.discoveredBy && <p>Découvert par : {body.discoveredBy}</p>}
    </>
  );
}
