import Link from 'next/link';

type PropsType = {
  body: SolarSystemObjectRestApi;
};

export default function Card({ body }: PropsType) {
  const aroundPlanetId =
    typeof body !== 'string' && body.aroundPlanet?.rel.split('/').at(-1);

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

  const getMoons = ():
    | {
        name: string;
        id: string;
      }[]
    | [] => {
    if (typeof body === 'string' || !body.moons) return [];
    return body.moons.map(({ moon, rel }) => ({
      name: moon,
      id: rel.split('/').at(-1)!,
    }));
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

      {body.moons && (
        <p>
          Satellite(s) :{' '}
          {!body.moons
            ? ' Aucun'
            : getMoons().map(({ name, id }, index, array) => (
                <>
                  <Link key={id} href={`${encodeURIComponent(id)}`}>
                    {name}
                  </Link>
                  {index !== array.length - 1 && ' - '}
                </>
              ))}
        </p>
      )}

      {aroundPlanetId && (
        <p>
          Planète proche :{' '}
          <Link href={`${encodeURIComponent(aroundPlanetId)}`}>
            {body.aroundPlanet?.planet}
          </Link>
        </p>
      )}

      {!!body.density && <p>{`Densité : ${body.density}`}</p>}

      {!!body.gravity && <p>{`Gravité : ${body.gravity}`}</p>}

      {!!body.dimension && <p>{`Dimension : ${body.dimension}`}</p>}

      {getDiscoveryDate !== null && (
        <p>{`Découvert le : ${getDiscoveryDate()}`}</p>
      )}
      
      {body.discoveredBy && <p>Découvert par : {body.discoveredBy}</p>}
    </>
  );
}
