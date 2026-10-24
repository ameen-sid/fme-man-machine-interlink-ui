// Machine Model Mapping for C&C Machines
// Model: Machine Numbers
// Alpha_355: 01, 03
// G_253: 02, 04, 11, 12, 15, 16, 17, 18
// TRD_301: 05, 06, 07, 08, 09, 10
// TRD_411F: 14, 19, 23, 24, 29
// G_252: 20, 21, 22
// JAM: 25
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

  25: 'JAM',

  26: 'G_448',
  27: 'G_448',
  28: 'G_448',
  30: 'G_448',
  31: 'G_448',
  32: 'G_448'
};

export const RESISTANCE_WELDING_MODEL_MAP = {
  1: 'Machine 1',
  2: 'Machine 2',
  3: 'Machine 3',
  4: 'Machine 4',
  5: 'Machine 5',
  6: 'Machine 6',
  7: 'Machine 7'
};

export function getMachineModel(machineId, process = '') {
  if (typeof machineId === 'string') {
    const clean = machineId.trim().toUpperCase().replace(/[-_\s]/g, '');
    if (clean.includes('RSW') || clean.includes('R/SW') || clean.includes('R_SW') || process === 'Resistance Welding') {
      const numMatch = machineId.match(/\d+/);
      const num = numMatch ? Number(numMatch[0]) : 1;
      return RESISTANCE_WELDING_MODEL_MAP[num] || `Machine ${num}`;
    }
    if (clean === 'MCR' || clean.startsWith('MCR') || clean.includes('MANUALCRIMPING') || process === 'Manual Crimping') {
      return 'Mecal-05';
    }
    if (clean.includes('TRD411F') || clean.includes('TRD411')) return 'TRD_411F';
    if (clean.includes('TRD301')) return 'TRD_301';
    if (clean.includes('ALPHA355')) return 'Alpha_355';
    if (clean.includes('G253')) return 'G_253';
    if (clean.includes('G252')) return 'G_252';
    if (clean.includes('G448')) return 'G_448';
    if (clean.includes('JAM') || clean.includes('JAN')) return 'JAM';
  }
  if (process === 'Manual Crimping') {
    return 'Mecal-05';
  }
  const idNum = Number(machineId);
  if (process === 'Resistance Welding') {
    return RESISTANCE_WELDING_MODEL_MAP[idNum] || `Machine ${idNum}`;
  }
  return MACHINE_MODEL_MAP[idNum] || `Model ${machineId}`;
}
