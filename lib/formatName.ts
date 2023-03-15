const formatbodyName = (name: string) => {
  if (!(name.includes(') '))) return name
  
  return name.split(') ').at(-1) || name;
}

export default formatbodyName;
