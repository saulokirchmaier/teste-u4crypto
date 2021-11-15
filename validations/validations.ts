export const isValidUser = (user) => {
  const { fullName, email, document, address, vehiclePlate, vehicleModel } = user;

  if (!fullName || !email || !document || !address || !vehiclePlate || !vehicleModel) {
    throw new Error('Invalid entries!')
  }
};
