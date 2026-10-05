// Machine Model Mapping for C&C Machines
// Model: Machine Numbers
// Alpha_355: 01, 03
// G_253: 02, 04, 11, 12, 15, 16, 17, 18
// TRD_301: 05, 06, 07, 08, 09, 10
// TRD_411F: 14, 19, 23, 24, 29
// G_252: 20, 21, 22
// JAN: 25
// G_448: 26, 27, 28, 30, 31, 32

export const MACHINE_MODEL_MAP = {
  1: 'Alpha_355',
  3: 'Alpha_355',

  2: 'G_253',
  4: 'G_253',
  11: 'G_253',
  12: 'G_253',
  15: 'G_253',
  16: 'G_253',
  17: 'G_253',
  18: 'G_253',

  5: 'TRD_301',
  6: 'TRD_301',
  7: 'TRD_301',
  8: 'TRD_301',
  9: 'TRD_301',
  10: 'TRD_301',

  14: 'TRD_411F',
  19: 'TRD_411F',
  23: 'TRD_411F',
  24: 'TRD_411F',
  29: 'TRD_411F',

  20: 'G_252',
  21: 'G_252',
  22: 'G_252',

  25: 'JAN',

  26: 'G_448',
  27: 'G_448',
  28: 'G_448',
  30: 'G_448',
  31: 'G_448',
  32: 'G_448'
};

export function getMachineModel(machineId) {
  const idNum = Number(machineId);
  return MACHINE_MODEL_MAP[idNum] || `Model ${machineId}`;
}