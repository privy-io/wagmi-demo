export const shorten = (address: string | undefined) => {
  if (!address) return '';
  console.log(address);
  return `${address.substring(0, 6)}...${address.substring(address.length - 4, address.length)}`;
};

export type AddressString = `0x${string}`;
